#!/usr/bin/env python
import pika
import matplotlib.pyplot as plt
import tempfile
import pytz
from datetime import datetime
import time
import pyart
import nexradaws
import json
import gzip
from pymongo import MongoClient
import gridfs

client = MongoClient('mongodb://sgaUser:sga123@cluster0-shard-00-00-moj0w.mongodb.net:27017,cluster0-shard-00-01-moj0w.mongodb.net:27017,cluster0-shard-00-02-moj0w.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq-test'))
channel = connection.channel()
channel.queue_declare(queue='sendData')
scans = []
templocation = tempfile.mkdtemp()
conn = nexradaws.NexradAwsInterface()
def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
    data= json.loads(body)
    
    central_timezone = pytz.timezone('US/Central')
    radar_id = data['radar']
    year = data['year']
    month = data['month']
    day = data['day']
    scans = conn.get_avail_scans(year, month, day, radar_id)
    print("scans: ",scans[0:int(data["n"])])

    results = conn.download(scans[0:int(data["n"])], templocation)

    for scan in results.iter_success():
        print ("{} volume scan time {}".format(scan.radar_id,scan.scan_time))
        
    #scans.append(filename)
    i = 0
    fig = plt.figure(figsize=(16,12))
    database = client['plots']
    fs = gridfs.GridFS(database)
    for i,scan in enumerate(results.iter_success(),start=1):
        ax = fig.add_subplot(2,2,i)
        radar = scan.open_pyart()
        display = pyart.graph.RadarDisplay(radar)
        display.plot('reflectivity',0,ax=ax,title="{} {}".format(scan.radar_id,scan.scan_time))
        display.set_limits((-150, 150), (-150, 150), ax=ax)
        plt.savefig("plots/"+data["date"]+"-"+data["radar"]+"-"+scan.filename[-1]+".png")
        
    plt.show()
    image = "plots/"+data["date"]+"-"+data["radar"]+"-"+scan.filename[-1]+".png"
    datafile = open(image,"rb");
    plot = datafile.read()
    stored = fs.put(plot, filename=image, username = data["username"], timestamp=datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S'))
    



    

    # for file in results:
    #     radar = pyart.io.read_nexrad_archive(file)
    #     display = pyart.graph.RadarDisplay(radar)
    #     fig = plt.figure(figsize=(6, 5))
    
    #   # plot super resolution reflectivity
    #     ax = fig.add_subplot(111)
    #     display.plot('reflectivity', 0, title='NEXRAD Reflectivity',
    #          vmin=-32, vmax=64, colorbar_label='', ax=ax)
    #     display.plot_range_ring(radar.range['data'][-1]/1000., ax=ax)
    #     display.set_limits(xlim=(-500, 500), ylim=(-500, 500), ax=ax)
    #     i = i+1
    #     #name = filename.split("/")
    #    plt.savefig("plots/"+files["date"]+"-"+files["radar"]+"-"+filename[-1]+".png")
    #plt.show()
    session_connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-test'))
    session_channel = session_connection.channel()
    session_channel.queue_declare(queue='receiveData')
    print(data['username'])
    sessionObj = {"username":data["username"],"status":"Saved", "timestamp":datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')}
    session_channel.basic_publish(exchange='',
	                      routing_key='',
	                      body=json.dumps(sessionObj))



    #session_connection.close()



    

channel.basic_consume(queue='sendData',
                      auto_ack=True,
                      on_message_callback=callback)


print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()

