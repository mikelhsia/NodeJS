var http = require('http');
var url = require('url');

var qs = require('querystring');
var processRequest = function(req, callback) {
    var body ='';
    req.on('data', function(data) {
        body += data;
    });
    req.on('end', function() {
        callback(qs.parse(body));
    });
};

var controller = function(req, res) {
    var message = '';
    switch (req.method) {
        case 'GET':
            message = "That\'s a GET message";
            break;
        case 'POST':
            message = 'That\'s a POST message';
            break;
        case 'PUT':
            processRequest(req, function(data) {
                message = 'That\'s a PUT message. You are editing ' + data.book + "  Book.";
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(message + "\n");
            });
            return;
            break;
        case 'DELETE':
            message = 'That\'s a DELETE message';
            break;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(message + '\n');
}

http.createServer(controller).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1');
