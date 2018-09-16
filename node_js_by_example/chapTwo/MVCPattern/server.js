// MVC pattern
// View component
var view = {
    render: function() {
        var html = `<!DOCTYPE html>` +
        `<html>` +
        `<head><title>Node.js by example</title><head>`+
        `<body>`+
        `<h1>Status ` + (model.status ? 'on' : 'off') +`</h1>`+
        `<a href='/on'>switch on</a>`+
        `<br>`+
        `<a href='/off'>switch off</a>`+
        `</body>`+
        `</html>`;

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html + '\n');
    }
}

// Model component
var model = {
    status: false,
    update: function(s) {
        this.status = s;
        view.render();
    }
};

// Controller component
var http = require('http'), res;
var controller = function(request, response) {
    res = response;
    if(request.url === '/on') {
        model.update(true);
    } else if (request.url === '/off') {
        model.update(false);
    } else {
        view.render();
    }
};

http.createServer(controller).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
