/**
 * Created by nikolajgriskin on 20.02.17.
 */

var WebSocketServer = new require("ws");

var clients = {};

var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: 'wQ17t6dQklIre9yaM6HzNQ',
    consumer_secret: 'rPXq3ekF5ZXUwjl2uwMYllbpD77JSTNol5EIvkbcbc',
    access_token_key: '494208236-EGVwT0HbsFQcI2orZJ1hCvQVwULSTj9PCYXCugVg',
    access_token_secret: 'GDELq4wfRkkfIW2W8OVeiMKDFwK3WrT2T656dW1faDPFv'
});

function start() {

    var webSocketServer = new WebSocketServer.Server({
        port: 8888
    });

    webSocketServer.on('connection', function (ws) {
        var id = Math.random();
        clients[id] = ws;
        console.log("Новое соединение " + id);

        ws.on('message', function(message_str) {
            var message = JSON.parse(message_str);

            console.log('Получено: ' + message_str);
            //console.log('Track "' + message.track + '"');

            var query = {};
            if (message.track !== '') query.track = message.track;
            if (message.language !== '') query.language = message.language;
            query.locations = [message.sw_lng, message.sw_lat, message.ne_lng, message.ne_lat].join(',');

            console.log(JSON.stringify(query));
            var stream = client.stream('statuses/filter', query);

            stream.on('data', function (event) {
                //console.log(event && event.text);
                for (var key in clients) {
                    clients[key].send(event.text);
                }
            });

            stream.on('error', function (error) {
                throw error;
            });
        });

        ws.on('close', function () {
            console.log("Соединение закрыто " + id);
            delete clients[id];
        });
    });
};

exports.start = start;