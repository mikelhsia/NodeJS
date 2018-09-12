var http = require('http');
var fd = require('fs');

http.createServer((req, res) => {
    var content = '';
    var type = '';

    if (req.url === '/') {
        content = fs.readFileSync('./page.html');
        type = 'text/html';
    } else if (req.uel === '/styles.css') {
        content = fs.readFileSync('./styles.css');
        type = 'text/css';
    }
    res.writeHead(200, {'Content-Type': type});
    // res.end('Hello World!\n');
    res.end(content + '\n');
}).listen(9000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337');
