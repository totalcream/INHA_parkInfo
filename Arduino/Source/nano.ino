#include <WiFi.h>
#include <ArduinoHttpClient.h>

// 소프트웨어 시리얼 관련 라이브러리
#include <SoftwareSerial.h>

// ESP-01에 관한 라이브러리
#include <ESP8266.h>
#include <ESP8266Client.h>

// Arduino에서 JSON작업을 위한 라이브러리
#include <ArduinoJson.h>

// 사용 X
#define DEV 1

// 수신 및 송신 핀 설정
#define BT_RXD 2 
#define BT_TXD 3 

// 와이파이 설정
// #define SSID "ipTIME Guest1"
// #define PWD "33333333"

#define SSID "Hoha"
#define PWD "33333333"
// 사용x
#define IP "52.79.49.242"

// 주차장 대수에 맞게 배열로 설정하고
int sensorPin[9] = {A0, A1, A2, 10, 11, 12, A6, A3, A4};
// 전부 0으로 설정
bool sensorState[9] = { 0 };


// 소프트웨어시리얼 선언
SoftwareSerial esp8266Serial = SoftwareSerial(2, 3);
ESP8266 wifi = ESP8266(esp8266Serial);

//SoftwareSerial ESP_wifi(BT_RXD, BT_TXD); 
void setup() { 
  // 핀모드 전부 INPUT으로 바꾸기
  for(int i = 0; i < sizeof(sensorPin)/4; i++) {
    pinMode(sensorPin[i], INPUT);
  }

  // 시리얼 통신 시작
  Serial.begin(9600);
  esp8266Serial.begin(9600);  // ESP8266

  //와이파이 모듈 생성
  wifi.begin();
  wifi.setTimeout(1000);

  // test
  Serial.print("test: ");
  Serial.println(getStatus(wifi.test()));

  // restart
  Serial.print("restart: ");
  Serial.println(getStatus(wifi.restart()));

  // getVersion
  char version[16] = {};
  Serial.print("getVersion: ");
  Serial.print(getStatus(wifi.getVersion(version, 16)));
  Serial.print(" : ");
  Serial.println(version);

  Serial.print("setWifiMode: ");
  Serial.println(getStatus(wifi.setMode(ESP8266_WIFI_STATION)));

  // quitAP
  Serial.print("quitAP: ");
  Serial.println(getStatus(wifi.quitAP()));

  // joinAP
  Serial.print("joinAP: ");
  Serial.println(getStatus(wifi.joinAP(SSID, PWD)));

  // getAP
  Serial.print("getAP: ");
  Serial.println(getStatus(wifi.getAP(SSID)));


  /****************************************/
  /******       TCP/IP commands      ******/
  /****************************************/

  // 서버 주소
  Serial.print("Connecting to : ");
  Serial.println(IP);

  // 접속안됨
  // connect with webserver 
  Serial.print("connect: ");
  Serial.println(getStatus(wifi.connect(ESP8266_PROTOCOL_TCP, 
  IPAddress(52, 79, 49, 242), 80)));
  getConnectionStatue(wifi);

  // send to webserver
  Serial.print("send: ");
 // 2줄을 띄워줘야 함(\r\n\r\n) 
  Serial.println(getStatus(wifi.send("POST /api/gethttp HTTP/1.0\r\n\r\n")));

  Serial.println("Connect to http server : ");
} 
void loop() { 

  // 센서 값 읽기 0~6 아날로그, 7~8 디지털
  for (int i = 0; i < sizeof(sensorPin)/4; i++) {
      // if (i < 7)
      //   sensorState[i] = analogRead(sensorPin[i]);
      // else
        sensorState[i] = digitalRead(sensorPin[i]);
    }
  

  // JSON파일 생성
  StaticJsonDocument<200> json;

  // JSON파일 내 배열 생성
  JsonArray SensorValue = json.createNestedArray("SensorValue");

  // JSON파일 내 배열에 센서 값 담기
  for (int i = 0; i<sizeof(sensorPin)/4; i++) {
    SensorValue.add(sensorState[i]);
  }

  // 시리얼 모니터에 데이터 print
  // serializeJson(json, Serial);
  Serial.println();
  serializeJsonPretty(json, Serial);

  //데이터 String화
  String parsedJsonToString;
  serializeJson(json, parsedJsonToString);

  String head = "POST /api/gethttp HTTP/1.0";
  String tail = "\r\n\r\n";

  String sum = head + parsedJsonToString + tail;

  Serial.print("connect: ");
  Serial.println(getStatus(wifi.connect(ESP8266_PROTOCOL_TCP, 
  IPAddress(52, 79, 49, 242), 80)));
  getConnectionStatue(wifi);
  // send to webserver
  Serial.print("send: ");
 // 2줄을 띄워줘야 함(\r\n\r\n) 
  // Serial.println(getStatus(wifi.send("POST /api/gethttp HTTP/1.0\r\n\r\n")));
  Serial.println(getStatus(wifi.send(sum)));

  delay(5000);  //Send a request every 2 seconds
}


void getConnectionStatue(ESP8266 wifi) {
  // getConnectionStatus
  ESP8266ConnectionStatus connectionStatus;
  ESP8266Connection connections[5];
  unsigned int connectionCount;
  Serial.print("getConnectionStatus: ");
  Serial.print(getStatus(wifi.getConnectionStatus(connectionStatus, connections, connectionCount)));
  Serial.print(" : ");
  Serial.println(connectionCount);
  for (int i = 0; i < connectionCount; i++) {
    Serial.print(" - Connection: ");
    Serial.print(connections[i].id);
    Serial.print(" - ");
    Serial.print(getProtocol(connections[i].protocol));
    Serial.print(" - ");
    Serial.print(connections[i].ip);
    Serial.print(":");
    Serial.print(connections[i].port);
    Serial.print(" - ");
    Serial.println(getRole(connections[i].role));
  }
}

String getStatus(bool status)
{
  if (status)
    return "OK";

  return "KO";
}

String getStatus(ESP8266CommandStatus status)
{
  switch (status) {
    case ESP8266_COMMAND_INVALID:
      return "INVALID";
      break;

    case ESP8266_COMMAND_TIMEOUT:
      return "TIMEOUT";
      break;

    case ESP8266_COMMAND_OK:
      return "OK";
      break;

    case ESP8266_COMMAND_NO_CHANGE:
      return "NO CHANGE";
      break;

    case ESP8266_COMMAND_ERROR:
      return "ERROR";
      break;

    case ESP8266_COMMAND_NO_LINK:
      return "NO LINK";
      break;

    case ESP8266_COMMAND_TOO_LONG:
      return "TOO LONG";
      break;

    case ESP8266_COMMAND_FAIL:
      return "FAIL";
      break;

    default:
      return "UNKNOWN COMMAND STATUS";
      break;
  }
}

String getRole(ESP8266Role role)
{
  switch (role) {
    case ESP8266_ROLE_CLIENT:
      return "CLIENT";
      break;

    case ESP8266_ROLE_SERVER:
      return "SERVER";
      break;

    default:
      return "UNKNOWN ROLE";
      break;
  }
}

String getProtocol(ESP8266Protocol protocol)
{
  switch (protocol) {
    case ESP8266_PROTOCOL_TCP:
      return "TCP";
      break;

    case ESP8266_PROTOCOL_UDP:
      return "UDP";
      break;

    default:
      return "UNKNOWN PROTOCOL";
      break;
  }
}