# Project Uji Coba LKS Provinsi 2023
<p>This is a project for East Java Province LKS activities in 2023</p>

# Folder ESP32 Code
ESP32 code is the program code for ESP32 microcontroller and DHT22, please change the program in the section:
>&nbsp;&nbsp;SSID="Enter the name of the hotspot being used"<br/>
>&nbsp;&nbsp;password = "Enter the hotspot password used"<br/>
>&nbsp;&nbsp;mqtt_broker="Enter the url of the MQTT broker"<br/>
>&nbsp;&nbsp;mqtt_user="Enter the username of the MQTT"<br/>
>&nbsp;&nbsp;mqtt_password="Enter the password of MQTT"<br/>

# Folder Log
The log folder contains files that have the function to display the MQTT Log to the Web Application, in this Web Application configuration you must follow the following command:
## Install Dependencies
>npm install -g

## Setting Environments Variable
>MQTT_BROKER=mqtt://your_url_MQTT_broker<br/>
>MQTT_PORT=1883<br/>
>MQTT_USERNAME=your username mqtt<br/>
>MQTT_PASSWORD=your password mqtt<br/>
>DB_HOST=your endpoint Database<br/>
>DB_USER=your username Database<br/>
>DB_PASSWORD=your password Database<br/>
>DB_NAME=your name Database<br/>

## Command run application
>npm run prod

## Run Log Application
> Open browser and access your ip+port, ex: localhost:3500 //if you create EC2 instance and not use Load Balancer<br/>
> Open your url Load Balancer //if your create Public Load Balancer<br/>

## User Data Apps
> #!/bin/bash
> echo "step1"
> yum install git gcc-c++ make -y
> curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
> yum install nodejs -y
> echo "step2"
> mkdir /home/ec2-user/lkskabmalang2023
> git clone https://github.com/handipradana/lkskabmalang2023.git
> /home/ec2-user/lkskabmalang2023
> echo $(ls /home/ec2-user/lkskabmalang2023)
> echo "step4"
> touch /home/ec2-user/lkskabmalang2023/log/.env
> printf "MQTT_BROKER=mqtt://134.229.201.131\n" >> /home/ec2-
> user/lkskabmalang2023/log/.env
> printf "MQTT_PORT=1883\n" >> /home/ec2-user/lkskabmalang2023/log/.env
> printf "MQTT_USERNAME=sony\n" >> /home/ec2-
> user/lkskabmalang2023/log/.env
> printf "MQTT_PASSWORD=adminsony\n" >> /home/ec2-
> user/lkskabmalang2023/log/.env
> printf "DB_HOST=lks-mysql.cvtkq5deqmb8.us-east-1.rds.amazonaws.com\n" >> /home/ec2-user/lkskabmalang2023/log/.env
> printf "DB_USER=admin\n" >> /home/ec2-user/lkskabmalang2023/log/.env
> printf "DB_PASSWORD=adminsony\n" >> /home/ec2-
> user/lkskabmalang2023/log/.env
> printf "DB_NAME=lks_iot\n" >> /home/ec2-user/lkskabmalang2023/log/.env
> echo "step5"
> npm install --prefix /home/ec2-user/lkskabmalang2023/log/
> npm run prod --prefix /home/ec2-user/lkskabmalang2023/log/
> echo "finish"
