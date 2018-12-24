/*
Creating a very simple HTTPS server
 */

let fs = require('fs'),
    https = require('https');

let privateKey = fs.readFileSync('site.key').toString();
let certificate = fs.readFileSync('final.crt').toString();

let options = {
    key: privateKey,
    cert: certificate
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('Hello secure world\n');
}).listen(443);
