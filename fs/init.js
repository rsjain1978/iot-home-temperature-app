load('api_dht.js');
load('api_config.js');
load('api_timer.js');
load('api_rpc.js');
load('api_gpio.js');
load("api_esp8266.js");
load("api_mqtt.js");

let pin = Cfg.get('app.pin');

let dht = DHT.create(pin, DHT.DHT11);
let response;
let topic = 'iot/telemetrics';
let responseTopic = 'iot/command/telemetrics';
MQTT.sub(responseTopic,function(conn, topic, msg){
    print("got message from server on topic", topic);
    print("got message from server and it says", msg);
});

/*
MQTT.setEventHandler(function(EV_CONNACK, event, data){
    print("connected to mqtt broker", event);
},null);
MQTT.setEventHandler(function(EV_CLOSE, event, data){
    print("connected closed with mqtt broker", event);
},null);
MQTT.setEventHandler(function(EV_PUBLISH, event, data){
    print("message published to topic this device is connected to", event);
},null);
*/
let publishTemperatureToAWS = function(){
    
    //print('temperature is:', dht.getTemp(),'C & humidity is',dht.getHumidity(),'%');
    let message = JSON.stringify({
        'deviceId':Cfg.get("aws.thing_name"),
        'temperature':dht.getTemp(),
        'humidity':dht.getHumidity(),
        'timestamp': Timer.fmt("%c", Timer.now())
    });

    response = MQTT.pub(topic, message, 1);
    print(topic,response);
};

Timer.set(10000, true, function(){
    publishTemperatureToAWS();
}, null);

RPC.addHandler('Temp.Read', function(args) {
    return { value: dht.getTemp() };
  });


