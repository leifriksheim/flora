#include "ESP8266WiFi.h"
#include "ESP8266HTTPClient.h"
#include "DHT.h"
#include "ArduinoJson.h"
#include <arduino_secrets.h>

#define DHTPIN 4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;

void setup()
{

  Serial.begin(115200);

  dht.begin();

  WiFi.begin(ssid, pass);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println("Connected to the WiFi network");
  delay(1000);
}

void loop()
{

  /*
    float h = dht.readHumidity();
    // Read temperature as Celsius (the default)
    float t = dht.readTemperature();
    // Read temperature as Fahrenheit (isFahrenheit = true)
    float f = dht.readTemperature(true);
    */

  if ((WiFi.status() == WL_CONNECTED))
  {

    WiFiClient client;
    HTTPClient http;

    float h = 1;
    float t = 2;
    float f = 3;

    DynamicJsonDocument doc(1024);

    JsonObject fields = doc.createNestedObject("fields");
    fields["Name"] = "Mushroom Box 1";
    fields["Temperature"] = t;
    fields["Humidity"] = h;

    String data;
    serializeJson(doc, data);

    Serial.println(data);

    http.begin(client, "https://flora-valldaura.firebaseio.com/readings.json");
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Authorization", "Bearer keyYTxVp7R6EePIrw");
    Serial.println("Sending HTTP Request");
    int httpResponseCode = http.POST(data);
    Serial.println("HTTP Request sent");
    if (httpResponseCode > 0)
    {
      String response = http.getString();

      Serial.println(httpResponseCode);
      Serial.println(response);
    }
    else
    {
      Serial.print("Error on sending POST Request: ");
      Serial.println(httpResponseCode);
    }

    http.end();

    delay(10000);
  };
}