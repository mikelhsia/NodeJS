let net = require('net');
let client = new net.Socket();
client.setEncoding('etf8');

// connect to server
client.connect('/somepath/nodesocket', () => {
    console.log('connected to server');
    client.write('Who needs a browser to communicate?');
});

// when receive data, send to server
process.stdin.on('data', (data) => {
    client.write(data);
});

// when receive data back, print to console
client.on('data', (data) => {
    console.log(data);
});

// when server closed
client.on('close', () => {
    console.log('connection is closed');
});