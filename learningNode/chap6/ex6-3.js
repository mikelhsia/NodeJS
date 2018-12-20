var fs = require('fs');

var readable = fs.createReadStream('./working.txt').setEncoding('utf8');

var data = '';

readable.on('data', (chunk) => {
    data += chunk;
});

readable.on('end', () => {
    console.log(data);
});
