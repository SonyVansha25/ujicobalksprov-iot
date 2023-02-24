var mqtt = require('mqtt');
var mysql = require('mysql');
require('dotenv').config({path: './.env'});
var client = mqtt.connect(process.env.MQTT_BROKER, {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD
});
// var client = mqtt.connect('mqtt://192.168.40.11');
console.log(`Test`+ process.env.MQTT_BROKER);
var express = require('express');
var app = express();

var logData = [];

// Buat koneksi ke database MySQL
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

client.on('connect', function () {
  client.subscribe('sensor/suhu');
  client.subscribe('sensor/kelembapan');
});

client.on('message', function (topic, message) {
  logData.push({ topic: topic, message: parseFloat(message.toString()) });
  // var sql = `INSERT INTO tbl_store (topic, message) VALUES ('${topic}', '${message.toString()}')`;
  // connection.query(sql, function (error, results, fields) {
  //   if (error) throw error;
  //   console.log('Data berhasil disimpan');
  // });
});

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.send(`
    <html>
      <head>
        <title>MQTT Log</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
        <style>
          canvas {
            max-width: 100%;
            height: 500px;
          }
        </style>
      </head>
      <body>
        <h1>MQTT Log</h1>
        <div>
          <canvas id="myChart"></canvas>
        </div>
        <script>
          var ctx = document.getElementById('myChart').getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: [${logData.map(function (data) {
                return `"${data.topic}"`;
              }).join(', ')}],
              datasets: [{
                label: 'Data Sensor',
                data: [${logData.map(function (data) {
                  return `${data.message}`;
                }).join(', ')}],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });
        </script>
      </body>
      </html>
      `);
    });
    
    app.listen(3500, function () {
      console.log('MQTT Log app listening on port 3500!');
    });
    
