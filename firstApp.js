const http = require('http')
const mqtt=require('mqtt');

var client = mqtt.connect("mqtt://mqtt.eclipseprojects.io",{clientId:"mqttjs01"}); client.on("connect",function(){
    console.log("connected"); });
client.on("error",function(error){ console.log("Can't connect"+error);
});

// Automatically update sensor value every 2 seconds
//we use a nested function (function inside another function)
setInterval(function() {

    const data = JSON.stringify({
        'sensor': 'ID1',
        'timestamp': 12345678,
        'temperature': 32
    })

    const options = {

        hostname: '10.0.13.50',
        port: 3000,
        path: '/temperature',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    client.publish("trial2/IoTLesson/raspberry/temp", data);
}, 2000);
