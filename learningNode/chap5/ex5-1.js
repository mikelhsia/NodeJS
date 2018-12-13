var http = require('http');
var querystring = require('querystring');
var portNumber = 8124;
var server = http.createServer().listen(portNumber);

server.on('request', (request, response) => {
    if (request.method == 'POST') {
        var body = '';

        // append data chunk to body
        request.on('data', (data) => {
            body += data;
        });

        request.on('end', () => {
            var post = querystring.parse(body);
            console.log(post);
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end('Hello World\n');
        });
    }
});


console.log('server listening on ' + portNumber);


