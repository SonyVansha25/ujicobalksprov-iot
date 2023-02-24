#include<DHT.h>
#include<PubSubClient.h>
#include<WiFi.h>

const char* ssid = "SEA - Hotspot NEW";
const char* password = "";
const char* mqtt_server = "192.168.40.11";
const char* mqtt_user = "handi";
const char* mqtt_password = "handi122";

#define pin 15
#define tipe DHT11
WiFiClient eclient;
PubSubClient client(eclient);
DHT dht(pin, tipe);
void setup() {
  // put your setup code here, to run once:
  dht.begin();
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
  client.setServer(mqtt_server, 1883);
}

void loop() {
  // put your main code here, to run repeatedly:

  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  
  float suhu = dht.readTemperature();
  float humi = dht.readHumidity();

  // Kirim data suhu dan kelembapan ke broker MQTT
  client.publish("sensor/suhu", String(suhu).c_str());
  client.publish("sensor/kelembapan", String(humi).c_str());
  
  Serial.println("Suhu: " + String(suhu) + "||" + "Kelembaban : " + String(humi));
  delay(10000);
}

void reconnect() {
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
    if (client.connect("ESP32_DHT11", mqtt_user, mqtt_password)) {
      Serial.println("Connected to MQTT");
    } else {
      Serial.println("Failed to connect to MQTT. Retrying in 5 seconds");
      delay(5000);
    }
  }
}
