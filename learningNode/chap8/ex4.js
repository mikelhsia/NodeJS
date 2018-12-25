let http = require('http');

let server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Handled by child\n');
});

process.on('message', (msg, httpServer) => {
    if (msg === 'server') {
        httpServer.on('connection', (socket) => {
            server.emit('connection', socket);
            console.log('Emitted the \'connection\' event');
        });
    }
});