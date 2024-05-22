#include <WiFi.h>
#include <HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>

const char* ssid     = "Alchemistic";
const char* password = "12345678";

#define SS_PIN 5 
#define RST_PIN 0

const char* serverUrl = "https://smart-cart-backend.onrender.com/user/cart/add";  

#define GREEN_LED_PIN 27 
#define RED_LED_PIN 2    

MFRC522 mfrc522(SS_PIN, RST_PIN);  

void setup() {
  Serial.begin(115200);
  SPI.begin();
  mfrc522.PCD_Init();  
  Serial.println("Approximate your card to the reader...");

    pinMode(GREEN_LED_PIN, OUTPUT); 
  pinMode(RED_LED_PIN, OUTPUT); 

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    digitalWrite(GREEN_LED_PIN, LOW);
  }
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  digitalWrite(GREEN_LED_PIN, HIGH); 
}

void loop() {
  mfrc522.PCD_Init();

  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
    delay(50);
    return;
  }

  digitalWrite(RED_LED_PIN, HIGH);
  delay(200);  
  digitalWrite(RED_LED_PIN, LOW);

  String rfid = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    rfid += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "") + String(mfrc522.uid.uidByte[i], HEX);
  }
  rfid.toUpperCase();
  Serial.println("RFID: " + rfid);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = String(serverUrl) + "/64d7a894cd0a785b6158d15c/" + rfid;
    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST("");

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Response Code: " + httpResponseCode);
      Serial.println("Response: " + response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  }

  delay(1000); 
}


