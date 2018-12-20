var http = require('http');
var fs = require('fs');
var zlib = require('zlib');

var gzip = zlib.createGzip();

var options = {
    host: 'localhost',
    port: 8124,
    method: 'POST',
    headers: {
        'Content-Type': 'application/javascript',
        'Content-Encoding': 'gzip,deflate'
    },
};

var req = http.request(options, (res) => {
    res.setEncoding('utf8');
    var data = '';
    res.on('data', (chunk) => {
        data += chunk;
        // console.log('+');
    });

    res.on('end', () => {
        console.log(data);
    });
});

req.on('error', (e) => {
    console.log('problem with request: ' + e.message);
});

// stream gzipped file to server
var readable = fs.createReadStream('./test.png');
readable.pipe(gzip).pipe(req);
