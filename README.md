# Project LKS Kab. Malang 2023
<p>This is a project for Malang District LKS activities in 2023</p>

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
Open browser and access your ip+port, ex: localhost:3500
