/*global require */
/*global console */

var http = require('http');
var server = http.createServer();

var fs = require('fs');

server.on('request', function (request, response) {
    "use strict";
    
    var newFile = fs.createWriteStream('test_copy.jpg'),
        fileBytes = request.headers['content-length'],
        uploadedBytes = 0,
        progress;
    
    request.on('readable', function () {
        var chunk = null;
        while (null !== (chunk = request.read())) {
            uploadedBytes += chunk.length;
            progress = (uploadedBytes / fileBytes) * 100;
            response.write("progress: " + parseInt(progress, 10) + "%\n");
        }
    });
    
    request.pipe(newFile);
    
    request.on('end', function () {
        response.end('uploaded!');
    });
}).listen(8080);