/*
 datagram (UDP) Client that send messages typed into the terminal
 */
let dgram = require('dgram');

let client = dgram.createSocket('udp4');

process.stdin.on('data', (data) => {
    console.log(`Sending string: ${data.toString('utf8').trim('/n')} to localhost`);

    client.send(data, 0, data.length, 8124, '127.0.0.1', (err, bytes) => {
        if (err) {
            console.error('error: ' + err);
        } else {
            console.log('sending successful');
        }
    });

});

// Connection is not maintained in UPD, so close event is not working
// client.on('close', () => {
//     console.log('UDP session closing');
// });

console.log('Start typing and press \"Ender\" to submit');
