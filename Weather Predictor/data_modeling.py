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

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.queue_declare(queue='sendData')
scans = []
def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
    files= json.loads(body)
    print(files)
    #scans.append(filename)
    i = 0
    for file,filename in files["scans"]:
        radar = pyart.io.read_nexrad_archive(file)
        display = pyart.graph.RadarDisplay(radar)
        fig = plt.figure(figsize=(6, 5))
    
      # plot super resolution reflectivity
        ax = fig.add_subplot(111)
        display.plot('reflectivity', 0, title='NEXRAD Reflectivity',
             vmin=-32, vmax=64, colorbar_label='', ax=ax)
        display.plot_range_ring(radar.range['data'][-1]/1000., ax=ax)
        display.set_limits(xlim=(-500, 500), ylim=(-500, 500), ax=ax)
        i = i+1
        #name = filename.split("/")
        plt.savefig("plots/"+files["date"]+"-"+files["radar"]+"-"+filename[-1]+".png")
    plt.show()
    session_connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    session_channel = session_connection.channel()
    session_channel.queue_declare(queue='receiveData')
    print(files['username'])
    sessionObj = {"username":files["username"],"status":"Saved", "timestamp":datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')}
    session_channel.basic_publish(exchange='',
	                      routing_key='',
	                      body=json.dumps(sessionObj))
    session_connection.close()



    

channel.basic_consume(queue='sendData',
                      auto_ack=True,
                      on_message_callback=callback)


print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()

