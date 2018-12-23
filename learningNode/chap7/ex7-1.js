let net = require('net');

const PORT = 8124;

let server = net.createServer(function(conn) {
    console.log('connected');

    conn.on('data', (data) => {
        console.log(data + ' from ' + conn.remoteAddress + ' ' + conn.remotePort);
        conn.write('Repeating: ' + data);
    });

    conn.on('close', () => {
        console.log('client closed connection');
    });
}).listen(PORT);

server.on('listening', () => {
    console.log('listening on ' + PORT);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.warn('Address in use, retrying...');
        setTimeout(() => {
            server.close();
            server.listen(PORT);
        }, 1000);
    } else {
        console.error(err);
    }
});
