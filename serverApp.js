const express = require("express");
const WebSocket = require("ws");
const path = require("path");
const mqtt=require('mqtt');


const app = express();

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    ws.send('something');
});

var mqttClient = mqtt.connect("mqtt://mqtt.eclipseprojects.io",{clientId:"mqttjs041"});
    mqttClient.on("connect",function(){
    console.log("connected"); });

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());
app.post("/temperature", (req, res, next) => {
    console.log(req.body.temperature);
    var temperature = req.body.temperature;
    var timestamp = req.body.timestamp;
    var sensor = req.body.sensor;


    async function pushToClient(){
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(temperature);
            }
        });
    }
    pushToClient().catch(console.dir);
    res.sendStatus(200)
});

app.get('/dashboard', async (req, res) => {

    res.sendFile(path.join(__dirname + '/index.html'));
})