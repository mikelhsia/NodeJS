var http = require('http');

var options = {
	host:'localhost',
	port:'8888',
	path:'/index.php'
};


var callback = function (response) {
	var body = '';

	response.on('data',function(data){
		body += data;
	});

	response.on('end',function() {
		console.log(body);
	});
}

// 向服务端发送请求
var request = http.request(options, callback);
request.end();