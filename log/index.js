var mqtt = require('mqtt');
require('dotenv').config({path: './.env'});
var client = mqtt.connect(process.env.MQTT_BROKER, {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD
});
console.log(`Test`+ process.env.MQTT_BROKER);
var express = require('express');
var app = express();

var logData = [];

client.on('connect', function () {
  client.subscribe('sensor/suhu');
  client.subscribe('sensor/kelembapan');
});

client.on('message', function (topic, message) {
  logData.push({ topic: topic, message: message.toString() });
});

app.get('/', function (req, res) {
  res.send(`
    <html>
      <head>
        <title>MQTT Log</title>
      </head>
      <body>
        <h1>MQTT Log</h1>
        <table border="1">
          <tr>
            <th>Topic</th>
            <th>Message</th>
          </tr>
          ${logData.map(function (data) {
            return `
              <tr>
                <td>${data.topic}</td>
                <td>${data.message}</td>
              </tr>
            `;
          }).join('')}
        </table>
      </body>
    </html>
  `);
});

app.listen(3000, function () {
  console.log('Server started on http://localhost:3000');
});
