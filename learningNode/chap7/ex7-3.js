let net = require('net');
let fs = require('fs');

const unixsocket = '/somepath/nodesocket';

let server = net.createServer((conn) => {
    console.log('connected');
    conn.on('data', (data) => {
        conn.write('Repeating: ' + data);
    });

    conn.on('close', () => {
        console.log('client closed connection');
    });
}).listen(unixsocket);

server.on('listening', () => {
    console.log('listening on ' + unixsocket);
});

// if exit and restart server, must unlink socket
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        fs.unlink(unixsocket, () => {
            server.listen(unixsocket);
        });
    } else {
        console.log(err);
    }
});

process.on('uncaughtException', (err) => {
    console.log(err);
});