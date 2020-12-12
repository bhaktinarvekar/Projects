#!/usr/bin/env python
import pika
import json
#%matplotlib inline
import matplotlib.pyplot as plt
import tempfile
import pytz
from datetime import datetime
# import pyart
import time

templocation = tempfile.mkdtemp()

import nexradaws



connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq-test'))
channel = connection.channel()
channel.queue_declare(queue='getData')



scans = []
def callback(ch, method, properties, body):
	print(" [x] Received %r" % body)
	conn = nexradaws.NexradAwsInterface()
	data = json.loads(body)
	central_timezone = pytz.timezone('US/Central')
	radar_id = data['radar_Id']
	year = data['year']
	month = data['month']
	day = data['day']
	#start = central_timezone.localize(datetime(2013,5,31,17,0))
	#end = central_timezone.localize (datetime(2013,5,31,19,0))
	# responseQ = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
	# responseQ = responseQ.channel()
	# responseQ.queue_declare(queue='status')
	# try:
	#  	scans = conn.get_avail_scans(year, month, day, radar_id)
	# except:
	# 	responseQ.basic_publish(exchange='',
	#                       routing_key='status',
	#                       body="Error: Please check the information entered")
		
	# else:
	# 	responseQ.basic_publish(exchange='',
	#                       routing_key='status',
	#                       body = "Downloading files")		
	# 	responseQ.close()


		

	#print("There are {} scans available between {} and {}\n".format(len(scans), start, end))
	scans = conn.get_avail_scans(year, month, day, radar_id)
	print("scans: ",scans[0:int(data["n"])])

	results = conn.download(scans[0:int(data["n"])], templocation)

	for scan in results.iter_success():
	    print ("{} volume scan time {}".format(scan.radar_id,scan.scan_time))
	    
	send_connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-test'))
	send_channel = send_connection.channel()
	send_channel.queue_declare(queue='hello')

	scansdata = [scan for scan in results.iter_success()]



	scansdata = []
	for scan in results.iter_success():
	     scansdata.append((scan.filepath,scan.filename))

	jsonObj = {"year":year,"month":month,"day":day,"n":data["n"], "date":year+"-"+month+"-"+day,"radar":radar_id,"username":data['username']}
	     
	send_channel.basic_publish(exchange='',
	                      routing_key='sendData',
	                      body=json.dumps(jsonObj))
	session_connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-test'))
	session_channel = session_connection.channel()
	session_channel.queue_declare(queue='receiveData')
	sessionObj = {"username":data['username'],"status":"retrieved", "timestamp":datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')}
	session_channel.basic_publish(exchange='',
	                  routing_key='',
	                  body=json.dumps(sessionObj))



	print(" [x] Sent 'Hello World!'")
	send_connection.close()
	session_connection.close()
	    

channel.basic_consume(queue='getData',
                      auto_ack=True,
                      on_message_callback=callback)
print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()





