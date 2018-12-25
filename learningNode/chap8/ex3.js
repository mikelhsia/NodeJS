let cp = require('child_process'),
    // cp1 = cp.fork('child2.js'),
    cp1 = cp.fork('ex4.js'),
    http = require('http');

let server = http.createServer();

server.on('request', (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Handled by parent\n');
});

server.on('listening', () => {
    cp1.send('server', server);
});

server.listen(3000);