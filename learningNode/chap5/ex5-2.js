var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
    'msg': 'Hello world!'
});

var options = {
    hostname: 'localhost',
    port: 8124,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
    },
    // to disable the connection polling
    agent: false
    // Change the maximum socket pool
    // agent.maxFreeSockets: 512
};

var req = http.request(options, (res) => {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');

    // get data as chunks
    res.on('data', function(chunk) {
        console.log('BODY: ' + chunk);
    });

    // end response
    res.on('end', () => {
        console.log('No more data in response.');
    });
});

req.on('error', (e) => {
    console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData);
req.end();
