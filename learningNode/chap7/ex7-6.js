/*
UDP server that bound to port 8124, listening for messages
 */
let dgram = require('dgram');

let server = dgram.createSocket('udp4').bind(8124);

server.on('message', (msg, rinfo) => {
    console.log('Message: ' + msg + ' from ' + rinfo.address + ':' + rinfo.port);
});

// server.bind(8124);

console.log(`Port 8124 has been bound`);