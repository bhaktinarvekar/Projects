#!/bin/bash



#Install Stackdriver logging agent
curl -sSO https://dl.google.com/cloudagents/install-logging-agent.sh
sudo bash install-logging-agent.sh

# Install or update needed software
sudo apt-get update


# Install jdk and maven
sudo apt install -y default-jdk
sudo apt install -y maven
sudo apt install -y git


echo "Cloning project"
git clone https://github.com/bhaktinarvekar/cloud_computing.git
cd /cloud_computing/KeyValueStore
mvn clean install
echo "Build maven project"
cd target
java -cp *.jar KeyValueStore








