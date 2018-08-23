//express_demo.js 文件

var express = require('express');
var util = require('util');
var app = express();

// 使用 express.static 中间件来设置静态文件路径
app.use(express.static('express_public'));

// 404 request respond page
// app.use(function(req, res, next) {
//   res.status(404).send('sorry cant find that!');
// });

// this handling all errors
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('something broke!');
});

/*
请求和响应
Express 应用使用回调函数的参数： request 和 response 对象来处理请求和响应的数据。
	app.get('/', function (req, res) {
	   // --
	})
request 和 response 对象的具体介绍：
Request 对象 - request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有：
req.app：当callback为外部文件时，用req.app访问express的实例
req.baseUrl：获取路由当前安装的URL路径
req.body / req.cookies：获得「请求主体」/ Cookies
req.fresh / req.stale：判断请求是否还「新鲜」
req.hostname / req.ip：获取主机名和IP地址
req.originalUrl：获取原始请求URL
req.params：获取路由的parameters
req.path：获取请求路径
req.protocol：获取协议类型
req.query：获取URL的查询参数串
req.route：获取当前匹配的路由
req.subdomains：获取子域名
req.accepts()：检查可接受的请求的文档类型
req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
req.get()：获取指定的HTTP请求头
req.is()：判断请求头Content-Type的MIME类型
Response 对象 - response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：
res.app：同req.app一样
res.append()：追加指定HTTP头
res.set()在res.append()后将重置之前设置的头
res.cookie(name，value [，option])：设置Cookie
opition: domain / expires / httpOnly / maxAge / path / secure / signed
res.clearCookie()：清除Cookie
res.download()：传送指定路径的文件
res.get()：返回指定的HTTP头
res.json()：传送JSON响应
res.jsonp()：传送JSONP响应
res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
res.redirect()：设置响应的Location HTTP头，并且设置状态码302
res.send()：传送HTTP响应
res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
res.set()：设置HTTP头，传入object可以一次设置多个头
res.status()：设置HTTP状态码
res.type()：设置Content-Type的MIME类型
*/
/**************** Routing ****************/
var formHTMLHeader = '<html><head><meta charset="utf-8"><title>实例</title></head>' + '<body>';
var formHTMLContentGet = '<form method="get" action="process_get">' +
						'网站名: <input name="name"><br>' +
						'网站 URL: <input name="url"><br>' +
						'<input type="submit">' + 
						'</form>';
var formHTMLFooter = '</body></html>';

//  主页输出 "Hello World"
app.get('/', function(request, response) {
	response.send(formHTMLHeader + formHTMLContentGet + formHTMLFooter);
	console.log("Get Method Hello World!");
});

// Return Json format data. Prototype of RESTful API
app.get('/process_get', function(request, response) {
	var response_json = {
		"name":request.query.name, 
		"url":request.query.url
	};
	response.end(JSON.stringify(response_json));
	console.log(response_json);
});

app.get('/restful', function(request, response) {
	var response_json= {
		"name":"999", 
		"url":"https://124.221.21.33"
	};
	response.end(JSON.stringify(response_json));
	console.log("RESTful called");
});

app.get('/del_user', function(request, response) {
	response.send("DEL USER");
	console.log("DELETE USER!");
});

app.get('/list_user', function(request, response) {
	response.send("LIST USER");
	console.log("LIST USER!");
});

//  对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(request, response) {
	response.send("ab*cd页面请求");
	console.log("Regular expression");
});

//  POST 请求
app.get('/post_in_name', function(request, response) {
	app.use(express.static('/'));
	response.sendFile(__dirname + '/post_index.html');
	console.log("Send the Post form page!");
});

//  POST 请求
var bodyParser = require('body-parser');
var multer = require('multer');
 // 中间件：来解析Form里面没有 enctype="multipart/form-data" 的POST表单
 // * 创建 application/x-www-form-urlencoded 编码解析
 // * var bodyParser = require('body-parser');
 // * var urlEncodedParser = bodyParser.urlencoded({extended:false});
 // * app.post('/process_post', urlEncodedParser, function(request, response) {} 
var fs = require('fs');

// Adding middleware instead of doing it directly in the app.post
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({dest:'/tmp/'}).array('file'));
app.post('/process_post', function(request, response) {
	
	// 输出 JSON 格式
	var post_response = {
       "first_name":request.body.first_name,
       "last_name":request.body.last_name,
       "file":request.files[0]
	};

	var des_file = __dirname + request.files[0].destination + request.files[0].originalname;

	if (!fs.existsSync(__dirname + request.files[0].destination)) {
        fs.mkdirSync(__dirname + request.files[0].destination);
    }

	fs.readFile(request.files[0].path, function(data,err) {
		fs.writeFile(des_file, data, function(err) {
			if (err) {
				console.log(err);
			} else {
				response_msg = {
					message:'File uploaded successfully',
					filename:request.files[0].originalname
				};
				console.log('File uploaded successfully...');
			}
		});
	});

	response.end(JSON.stringify(post_response));  // 上传的文件信息
	console.log(JSON.stringify(post_response));
	console.log('Parse the body and access post action.');
});

// 可以使用中间件向 Node.js 服务器发送 cookie 信息，以下代码输出了客户端发送的 cookie 信息
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.get('/cookie', function(req, res) {
	res.end("Cookie: " + JSON.stringify(req.cookies));
	console.log("Cookie: " + util.inspect(req.cookies));
});

// get python CGI
app.get('/python', function(request,response) {
	response.sendFile(__dirname + "/" + "hello.py");
	console.log("Found Python file at: " + __dirname + "/hello.py");
});

// 截取所有的页面，所有页面都会做这件事
app.get('/*', function(request, response) {
	response.sendFile(__dirname + "/" +"Chinese.html");
	console.log("default homepage");
});

var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;

	// console.log(util.inspect(server.address()));
	// console.log(util.inspect(port));
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
