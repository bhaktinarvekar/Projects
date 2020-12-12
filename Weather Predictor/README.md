# Weather Predictor


<<<<<<< HEAD

## Assignment No. 1:

# Documentation
This document provides the instructions to run the application on your machine.
=======
### Installation
>>>>>>> 6aa4b46534cfc5d761182577ddbb234f6b4aa10a

### Clone the project
```
1. Switch to 'assn1' branch.
2. git clone https://github.com/airavata-courses/RandomError.git
```
### Change to project directory
```
cd RandomError
```
# Running each module:
## 1. API Broker
This micro-service is the API gateway to interact with other services.
#### Language used: 
Java
### Pre-requisites
```
Any suitable IDE (preferably IntelliJ, Eclipse) to run Java Spring project with Maven Plugin.
RabbitMQ : Please follow the link https://www.rabbitmq.com/download.html
```
### Run the code: Open demo folder in IDE.
```
run the class 'DemoApplication.java' (src/main/java/com/example/demo/DemoApplication.java)
This will start the service on port 8080.
After starting all the below services visit: http://localhost:8080/homeLogin
```
## 2.UserManagement Service:
This micro-service is for registration and login activities.
#### Language used: 
Java
### Pre-requisites
```
Any suitable IDE (preferably IntelliJ, Eclipse) to run Java Spring project with Maven Plugin.
MongoDB Atlas is used as Database.
```
### Run the code: Open UserManagementBacked Folder in IDE.
```
run the class 'Receiver.java' (com/randomerror/usermanagement/receive/main/Receiver.java)
This will start the service on port 8081.
```

## 3. SessionManagement Service:
This micro-service is for storing the sessions and retrieving them.
#### Language used: 
NodeJS
### Pre-requisites
```
Any suitable IDE (preferably Visual Studio Code) to run NodeJS files.
MongoDB Atlas is used as Database.
```

### Install required libraries
```
Open Command Prompt/Terminal
Move to the directory sessionmanagement-service inside RandomError folder.
Install all the below mentioned packages

npm install --save mongoose
npm install --save express
npm install --save mongodb
npm install --save body-parser
npm install --save amqplib
```

### Run the code
```
Open Terminal in IDE or open Command Prompt/Terminal
Move to the directory sessionmanagement-service inside RandomError folder.
node savetodb.js

Open Terminal in IDE or open Command Prompt/Terminal
Move to the directory sessionmanagement-service inside RandomError folder.
node sendtoqueue.js
```

## 3. Data Retrieval Service and Data Analysis Service:

### Language Used:
Python

### Install required libraries
### Windows
```
1. Install Anaconda
2. Open Anaconda prompt and go to the path /RandomError
3. Use the link -> https://github.com/ARM-DOE/pyart/wiki/Simple-Install-of-Py-ART-using-Anaconda
	Use commands mentioned in the above link to install pyart
4. pip install pika
5. pip install nexradaws

```

### MacOSX / Linux:
```
Open the terminal and run the following commands
1. pip install pika
2. pip install nexradaws
3. pip install arm-pyart
4. pip install netCDF4
```
### Run
```
1. Go the respective folder Open a new Anaconda prompt or the terminal and type "python data_modeling.py"
2. Open a new Anaconda prompt or the terminal and type "python data_retrieval.py"
```

### Result
The final result will be saved in plots folder which is in the root directory of the repository.




## Assignment No. 2:


## Steps:

1. Switch to branch -> test
2. Make a commit on 'test' branch which will automatically trigger the build on Jenkins.
3. You can check the build progress on -> http://149.165.170.174:8080/ (username:- randomerror, password:-randomerror)
4. After the build is complete, run the UI on -> http://149.165.170.111:30127/
5. To ssh into Kubernetes master use the key 'RandomError-api-key' that is present on branch 'test' and run the following command:-
	- ssh -i RandomError-api-key ubuntu@149.165.170.111
6. Run the following commands on the Kubernetes master (149.165.170.111) to view plots:-
	- kubectl exec -it data-modeling-pod-name -- /bin/bash
	- cd plots
	- ls

