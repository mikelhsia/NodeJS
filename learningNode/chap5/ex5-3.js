var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    mime = require('mime'),
    path = require('path'),
    base = '/Users/michael/NodeJS/learningNode/chap5/home/examples/public_html';

http.createServer((req, res) => {
    var pathname = path.normalize(base + req.url);
    console.log(pathname);

    fs.stat(pathname, (err, stats) => {
        if (err) {
            console.log(err);
            res.writeHead(404);
            res.write('Resource missing 404\n');
            res.end();
        } else if (stats.isFile()) {

            // content type
            var type = mime.getType(pathname);
            console.log(type);
            res.setHeader('Content-Type', type);
            // res.setHeader('Content-Type', 'text/html');

            // create and pipe readable stream
            var file = fs.createReadStream(pathname);

            file.on('open', () => {
                res.statusCode = 200;
                file.pipe(res);
            });

            file.on('error', (err) => {
                console.log(err);
                res.statusCode = 403;
                res.write('file permission problem');
                res.end();
            });
        } else {
            res.writeHead(403);
            res.write('Directory access is forbidden');
            res.end();
        }
    });
}).listen(8124);

console.log('Server is running at 8124');
