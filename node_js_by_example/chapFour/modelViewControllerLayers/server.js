var http = require('http');
var fs = require('fs');
var path = require('path');
var Assets = require('./backend/Assets');

var files = {};
var port = 9000;
var host = '127.0.0.1';

/*
- API handler: The client-side part of our application will communicate with
the backend via the REST API. We introduced this concept in Chapter 2,
Architecting the Project.
- Page handler: If the request that comes to the server is not for an asset or API
resource, we will serve an HTML page, which is the page that normal users
will see.
*/

var app = http.createServer(assets).listen(port, host);
console.log('Listening on ' + host + ':' + port);
