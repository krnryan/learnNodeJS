/*global require*/

var cModule = require('./custom_module'),
    cModule2 = require('./custom_module2'),
    makeRequest = require('./make_request');

cModule();
cModule2.cModule2();
makeRequest("Hello, there!");