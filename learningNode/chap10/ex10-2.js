/*
Node application that processes web log entries and sends image resource
requests to the message queue
 */

let spawn = require('child_process').spawn;
let net = require('net');

let client = new net.Socket();
client.setEncoding('utf8');

// Connect to TCP server
client.connect('3000', 'examples.burningbird.net', () => {
    console.log('connected to server');
});

// start child process
let logs = spawn('tail' ['-f',
    '/home/main/logs/access.log',
    '/home/tech/logs/access.log',
    '/home/shelleypowers/logs/access.log',
    '/home/green/logs/access.log',
    '/home/puppies/logs/access.log']);

// Process child process data
logs.stdout.setEncoding('utf8');
logs.stdout.on('data', (data) => {
    // resource URL
    let re = /GET\s(\S+)\sHTTP/g;

    // graphics test
    let re2 = /\.git|\.png|\.jpg|\.svg/;

    // extract URL
    let parts = re.exec(data);
    console.log(parts[1]);

    // look for image and if found, store
    let tst = re.test(parts[1]);
    if (tst) {
        client.write(parts[1]);
    }
});

logs.stderr.on('data', (data) => {
    console.log('stderr: ' + data);
});

logs.on('exit', (code) => {
    console.log('Child process exited with code ' + code);
    client.end();
});