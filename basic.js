/*global require */
/*global console */

var http = require('http'); // How to require modules
var server = http.createServer();
var EventEmitter = require('events').EventEmitter;
var logger = new EventEmitter(); // Available events (error, warn, info)
var chat = new EventEmitter();
var users = [], chatlog = [];

// Another way to create server
// http.createServer(function (request, response) {
server.on('request', function (request, response) {
    "use strict";

    response.writeHead(200); // Status code in header
    response.write("Dog is running."); // Response body
    response.end(); // Close the connection
}).listen(8080); // Listen for connections on this port

server.on('request', function (request, response) {
    "use strict";
    
    console.log("New request coming in...");
    response.end(); // Close the connection
});

server.on("close", function () {
    "use strict";
    
    console.log("Closing down the server...");
});

console.log("Listening on port 8080...");

chat.on('message', function (message) {
    "use strict";

    chatlog.push(message);
});

chat.on('join', function (nickname) {
    "use strict";

    users.push(nickname);
});

// Listen for error event
logger.on('error', function (msg) {
    "use strict";

    console.log("ERROR: " + msg);
});

// Emit events here
chat.emit('join', 'Ryan');
chat.emit('message', 'hello!');

// How to log error
// logger.emit('error', 'Eggs Cracked!');