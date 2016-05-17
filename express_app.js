/*global require*/
/*global __dirname*/

var express = require("express");
var app = express();

app.get("/", function (request, response) {
    "use strict";
    
    response.sendFile(__dirname + "/index.html");
});

app.listen(8080);