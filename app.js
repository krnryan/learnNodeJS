/*global $*/
/*global require*/
/*global console*/
/*jslint nomen: true*/
/*global __dirname*/
/*jslint nomen: false*/

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('redis');
var redisClient = redis.createClient();
var storeMsg = function (name, data) {
    "use strict";

    var message = JSON.stringify({ name: name, data: data });

    redisClient.lpush('messages', message, function (err, res) {
        redisClient.ltrim('meggages', 0, 9);
    });
};

io.sockets.on('connection', function (socket) {
    "use strict";

    console.log('Client connected...');

    socket.on('messages', function (msg) {
        var nickname = socket.nickname;
        io.emit('messages', nickname + " said: " + msg);
        storeMsg(nickname, msg);
        io.emit('scrollTobottom');
    });

    socket.on('join', function (name) {
        socket.nickname = name;

        io.sockets.emit('addUser', name);

        redisClient.smembers('users', function (err, names) {
            names.forEach(function (name) {
                socket.emit('addUser', name);
            });
        });

        redisClient.sadd('users', name);

        redisClient.lrange('messages', 0, -1, function (err, msg) {
            var messages = msg.reverse(); // Reverse so they are emitted in correct order

            messages.forEach(function (msg) {
                msg = JSON.parse(msg); // Parse into JSON object
                socket.emit('messages', msg.name + " said: " + msg.data);
            });

            io.emit('scrollTobottom');
        });
    });

    socket.on('disconnect', function (name) {
        console.log('Client disconnected...');
        io.sockets.emit('removeUser', socket.nickname);
        redisClient.srem('users', socket.nickname);
    });
});

app.get('/', function (req, res) {
    "use strict";
    /*jslint nomen: true*/
    res.sendFile(__dirname + "/index.html");
    /*jslint nomen: false*/
});

server.listen(8080);
