/*global require*/
/*global options*/
/*global console*/
/*global module*/

var http = require('http'),
    options = {
        host: "localhost",
        port: 8080,
        path: "/",
        method: "POST"
    },
    request;

var makeRequest = function (msg) {
    "use strict";
    
    request = http.request(options, function (response) {
        response.on('data', function (data) {
            console.log(data);
        });
    });

    request.write(msg);
    request.end();
};

module.exports = makeRequest;