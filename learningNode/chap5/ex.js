var http = require('http');
var server = http.createServer().listen(8124);

server.on('request', (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
    
    // values are given as properties with request.headers, 
    // but as array elements for request.rawHeaders
    console.log(request.headers);
    console.log(request.rawHeaders);
    console.log('\n\n-----------');
    console.log(request.headers.host);
    console.log(request.rawHeaders[0] + ' is ' + request.rawHeaders[1]);
});

console.log('server listening on 8124');
