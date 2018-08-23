var TEST_HTTP = false;
var TEST_FS = false;
var TEST_HMMODULE = false;
var TEST_URL = false;
var TEST_EVENT = false;
var TEST_FORMIDABLE = false;
var TEST_EMAIL = false;
var TEST_STREAM = false;
var TEST_SERVER= true;
var TEST_FUNCTION = false;
var TEST_GLOBAL = false;
var TEST_UTIL = false;
var TEST_GET_POST = false;



/* Other modules
	模块名				描述
	OS 模块 			提供基本的系统操作函数。
	Path 模块 		提供了处理和转换文件路的工具。
	Net 模块 		用于底层的网络通信。提供了服务端和客户端的的操作。
	DNS 模块 		用于解析域名。
	Domain 模块 		简化异步代码的异常处理，可以捕捉处理try catch无法捕捉的。
*/

/*** Synchronuous 同步 ********************************
var fs = require("fs");

var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("程序执行结束!");

 *** Asynchronuous 异步 ********************************
var fs = require("fs");
fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});
console.log("程序执行结束!");
*/



if (TEST_HTTP) {
	var http = require('http'); // Require a built-in http module in Node.js
	var fs = require('fs'); // Require a built-in files erver module in Node.js
	var dt = require('./myfirstmodule'); // Require the home-made module
	var url = require('url'); // Require built-in url module
	var uc = require('upper-case');
	// req argument that represents the request from the client
	http.createServer(function (req, res) {
		// Send header and identify this is a html file, 200 means that all is OK
	    // fs.readFile('/Users/tsuyuhsia/Desktop/Practice/Chinese.html',function (err, data) {
	    fs.readFile('./myfirst.html',function (err, data) {
		    res.writeHead(200, {'Content-Type': 'text/html'});
	    	res.write(data);
	    	if (TEST_HMMODULE) {
		    	res.write("The date and time are currently: " + dt.myDateTime() + "<br>");
	    	}
		    // res.write(req.url);
		    res.end();
	    });
	}).listen(8080);
}

if (TEST_FS) {
	var fs = require('fs'); // Require a built-in files erver module in Node.js
	
	// Create a new, empty file using the open() method
	fs.open('mynewfile.txt', 'w', function (err, file) {
		if (err) throw err;
		console.log('Saved!');
	});

	// Create a file named mynewfile1.txt
	fs.appendFile('mynewfile.txt', 'Text Appended', function (err) {
		if (err) throw err;
		console.log('Appended!');
	});

	// Create a new file using the writeFile() method
	fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
		if (err) throw err;
		console.log('Saved!');
	});

	// Replace the content of the file "mynewfile3.txt":
	fs.writeFile('mynewfile3.txt', 'My text is here!', function (err) {
		if (err) throw err;
		console.log('Replaced!');
	});

	// Delete the files
	fs.unlink('mynewfile.txt', function (err) {
		if (err) throw err;
		console.log('File deleted!');
	});

	fs.unlink('mynewfile3.txt', function (err) {
		if (err) throw err;
		console.log('File deleted!');
	});
}



/*
 *                   		url.parse(string).query
 *                                           |
 *           url.parse(string).pathname      |
 *                       |                   |
 *                       |                   |
 *                     ------ -------------------
 *http://localhost:8888/start?foo=bar&hello=world
 *                                ---       -----
 *                                 |          |
 *                                 |          |
 *querystring.parse(queryString)["foo"]    	  |
 *                                            |
 *                         querystring.parse(queryString)["hello"]
*/
if (TEST_URL) {
	var http = require('http'); // Require a built-in http module in Node.js
	var fs = require('fs'); // Require a built-in files erver module in Node.js
	var url = require('url'); // Require built-in url module
	var uc = require('upper-case');

	var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
	var q = url.parse(adr, true);

	//returns 'localhost:8080'
	console.log(q.host); 
	//returns '/default.htm'
	console.log(q.pathname); 
	//returns '?year=2017&month=february'
	console.log(q.search); 

	//returns an object: { year: 2017, month: 'february' }
	var qdata = q.query; 
	console.log(qdata.year + '-' + uc(qdata.month)); 	
	
	http.createServer(function (req, res) {
		var q = url.parse(req.url, true);
		var filename = "." + q.pathname;
		fs.readFile(filename, function(err, data) {
			if (err) {
				res.writeHead(404, {'Content-Type': 'text/html'});
				return res.end("404 Not Found");
			}  
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			return res.end();
		});
	}).listen(8080);
}

/**
In the example below we have created a function that will be executed when a 
"scream" event is fired. To fire an event, use the emit() method.
*/
if (TEST_EVENT) {

	var events = require('events'); /* You can create-, 
									 * fire-, and 
									 * listen for- your own events
									 */
	var eventEmitter = new events.EventEmitter();	/* All event properties and methods 
													 * are an instance of an EventEmitter 
													 * object. To be able to access 
													 * these properties and methods, 
													 * create an EventEmitter object 
													 */


	// Create an event handler
	var myEventHandler = function (arg1, arg2) {
		console.log("Shout out loud! " + arg1 + ' ' + arg2);
	}

	// Assign this handler to an event
	// Bind named function
	eventEmitter.on('scream', myEventHandler);

	// Fire an event and adding parameters
	eventEmitter.emit('scream', "Arg1: Amy", "Arg2: Hsia");

	/*
	| Method 							|	Description
	| addListener(event, listener) 		|	为指定事件添加一个监听器到监听器数组的尾部。
	| on(event, listener)				|	为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。
	| once(event, listener) 			|	为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
	| removeListener(event, listener)	|	移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。它接受两个参数，第一个是事件名称，第二个是回调函数名称。
	| removeAllListeners([event]) 		|	移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。
	| setMaxListeners(n) 				|	默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。
	| listeners(event) 					|	返回指定事件的监听器数组。
	| emit(event,[arg1],[arg2],[...])	| 	按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。
	*/

}

// There is a very good module for working with file uploads, called "Formidable".
if (TEST_FORMIDABLE) {
	var http = require('http');
	var formidable = require('formidable');
	var fs = require('fs');
	// Step 1: Create a form
	// Step 2: Parse the Uploaded File
	// Step 3: Save the File - When a file is successfully uploaded to the server, it is placed on a temporary folder.

	http.createServer(function (req, res) {
		if (req.url == '/fileupload') {
			var form = new formidable.IncomingForm();
			form.parse(req, function (err, fields, files) {
				var oldPath = files.filetoupload.path;
				// console.log(oldPath);
				var newPath = "/Users/tsuyuhsia/Desktop/" + files.filetoupload.name;
				// console.log(newPath);

				fs.rename(oldPath, newPath, function(err) {
					if (err) throw err;
					res.write("File uploaded!");
					res.end();
				});
			});
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
			res.write('<input type="file" name="filetoupload"><br>');
			res.write('<input type="submit">');
			res.write('</form>');
			return res.end();
		}
	}).listen(8080);

}

if(TEST_EMAIL) {
	var mailer = require('nodemailer');

	// Use the username and password from your selected email provider to send an email.
	var transporter = mailer.createTransport({
		service: 'gmail',
		auth:{
			user: 'tsu.yu.hsia@tmogroup.asia',
			pass: 'f19811128'
		}
	});

	var mailOptions = {
		from: 'tsu.yu.hsia@tmogroup.asia',
		to: 'mikelhsia@hotmail.com',
		subject: 'Hello from TMO Node.js',
		text: '<h1>Hi Michael!</h1>'
	};

	transporter.sendMail(mailOptions, function (err, info){
		if (err) {
			console.log(err);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}
/*
	继承 EventEmitter
大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。
为什么要这样做呢？原因有两点：
首先，具有某个实体功能的对象实现事件符合语义， 事件的监听和发射应该是一个对象的方法。
其次 JavaScript 的对象机制是基于原型的，支持 部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系。
*/

/*
 * 在处理像TCP流或文件流时，必须使用到二进制数据。
 * 因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
 * Node Buffer 类可以通过多种方式来创建:
*/
// Step 1: Create buffer
var buf = new Buffer(10);							// 创建长度为 10 字节的 Buffer 实例
var buf = new Buffer([10, 20, 30, 40, 50]);			// 通过给定的数组创建 Buffer 实例
var buf = new Buffer("www.runoob.com", "utf-8");	// 通过一个字符串来创建 Buffer 实例 

// Step 2: Write data into buffer
/* string - 写入缓冲区的字符串。
 * offset - 缓冲区开始写入的索引值，默认为 0 。
 * length - 写入的字节数，默认为 buffer.length
 * encoding - 使用的编码。默认为 'utf8' 。
 * Example: buf.write(string[, offset[, length]][, encoding]);
*/

// Step 3: Read data from buffer
/* encoding - 使用的编码。默认为 'utf8' 。
 * start - 指定开始读取的索引位置，默认为 0。
 * end - 结束位置，默认为缓冲区的末尾。
 * Example: buf.toString([encoding[, start[, end]]]);
*/

// Step 4: Transfer to different format
/* To JSON:
 * Example: buf.toJSON()
*/

/* Additional: Merge the buffer
 * list - 用于合并的 Buffer 对象数组列表。
 * totalLength - 指定合并后Buffer对象的总长度。
 * Example: Buffer.concat(list[, totalLength])
 ***************************************
 * Additional: Compare the buffer
 * otherBuffer - 与 buf 对象比较的另外一个 Buffer 对象。
 * Return: 返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。
 * Example: buf.compare(otherBuffer);
 ***************************************
 * Additional: Copy the buffer
 * targetBuffer - 要拷贝的 Buffer 对象。
 * targetStart - 数字, 可选, 默认: 0
 * sourceStart - 数字, 可选, 默认: 0
 * sourceEnd - 数字, 可选, 默认: buffer.length
 * Example: buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
 ***************************************
 * Additional: slice the buffer
 * start - 数字, 可选, 默认: 0
 * end - 数字, 可选, 默认: buffer.length
 * Example: buf.slice([start[, end]])
 ***************************************
 * Additional: length of the buffer
 * Example: buf.length;
 ***************************************
 * Others: 
 * new Buffer(size) 
 * new Buffer(buffer) 
 * new Buffer(str[, encoding])
 * buf.write(string[, offset[, length]][, encoding])
 * buf.writeUIntLE(value, offset, byteLength[, noAssert])
 * buf.writeUIntBE(value, offset, byteLength[, noAssert])
 * buf.writeIntLE(value, offset, byteLength[, noAssert])
 * buf.writeIntBE(value, offset, byteLength[, noAssert])
 * buf.readUIntLE(offset, byteLength[, noAssert])
 * buf.readUIntBE(offset, byteLength[, noAssert])
 * buf.readIntLE(offset, byteLength[, noAssert])
 * buf.readIntBE(offset, byteLength[, noAssert])
 * buf.toString([encoding[, start[, end]]])
 * buf.toJSON()
 * buf[index]
 * buf.equals(otherBuffer)
 * buf.readUInt8(offset[, noAssert])
 * buf.readUInt16LE(offset[, noAssert])
 * buf.readUInt16BE(offset[, noAssert])
 * buf.readUInt32LE(offset[, noAssert])
 * buf.readUInt32BE(offset[, noAssert])
 * buf.readInt8(offset[, noAssert])
 * buf.readInt16LE(offset[, noAssert])
 * buf.readInt16BE(offset[, noAssert])
 * buf.readInt32LE(offset[, noAssert])
 * buf.readInt32BE(offset[, noAssert])
...
 */

/*
Node.js，Stream 有四种流类型：
Readable - 可读操作。
Writable - 可写操作。
Duplex - 可读可写操作.
Transform - 操作被写入数据，然后读出结果。
所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
data - 当有数据可读时触发。
end - 没有更多的数据可读时触发。
error - 在接收和写入过程中发生错误时触发。
finish - 所有数据已被写入到底层系统时触发。
*/
if (TEST_STREAM) {
	var fs = require('fs');	
	var zlib = require('zlib');
	var data = '';
	var data2 = '以上程序会将 data 变量的数据写入到 output.txt 文件中。代码执行结果如下:';
	var filename = 'ajax_info.txt';
	var bfilename = 'ajax_info.txt.bak.gz';
	var wfilename = 'output.txt';
	var flat = false;

	// 创建可读流
	var readStream = fs.createReadStream(filename);

	// 设置编码为 UTF-8
	readStream.setEncoding('UTF8');

	// 处理流事件 --> data, end, error
	readStream.on('data',function(chunk){
		data += chunk;
	});

	readStream.on('end', function() {
		console.log("Data Stream: " + data);
		var wStream = fs.createWriteStream(bfilename);
		fs.createReadStream(filename).pipe(zlib.createGzip()).pipe(wStream); // 链式操作; 链式流
		// fs.createReadStream('input.txt.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('input.txt'));

		// Don't close it directory since the pipe is running asynchrounously
		// rStream.close();
		// wStream.close();
		flag = true;
		console.log("Read Stream Complete!");
	});

	readStream.on('error', function (err){
		console.log("Data read error: " + err.stack);
	});

	// set interval 来检查flag是否被开启
	// var iid = setInterval (function() { 
	// 	if (flag) {
	// 		console.log("Read Stream Complete!");
	// 		clearInterval(iid);
	// 	}
	// },500);


	// 创建可写流
	var writeStream = fs.createWriteStream(wfilename);

	// 使用 utf8 编码写入数据
	writeStream.write(data2,'UTF8');

	// 标记文件末尾
	writeStream.end();

	// 处理流事件 --> data, end, error
	writeStream.on('finish', function () {
		console.log('写入完成');
	});

	writeStream.on('error', function(err){
		console.log('Data write error: ' + err.stack);
	});
}

if (TEST_SERVER) {
	var mymodule = require('./myfirstmodule.js');

	hello = new mymodule();
	hello.setName("Michael");
	hello.getName();

// -----------------------------------------
	var server = require('./server.js');
	var router = require('./route.js');

	server.start(router.route);
}

if (TEST_FUNCTION) {
	function say (word) {
		console.log(word);
	}

	function execute (someFunction, word) {
		someFunction(word);
	}

	execute(say,"This is a function called my name.");
	execute(function (word){console.log(word);}, "This is the second anonymous function called my name.")
}

if (TEST_GLOBAL) {
	console.log(__filename);
	console.error(__dirname);
	console.warn(__dirname);
	console.trace();
	
	// 输出到终端
	process.stdout.write("Standard Output write something" + "\n");

	// 通过参数读取
	process.argv.forEach(function(val, index, array) {
	   	console.log(index + ': ' + val);
	});

	// 获取执行路径
	console.log(process.execPath);

	// 平台信息
	console.log(process.platform);

	// setuid() ,getuid(), kill(), memoryUsage(), uptime(), umask()
}

if (TEST_UTIL) {
	var util = require('util');

	function Base () {
		this.name = 'base';
		this.base = 1991;
		this.sayHello = function () {
			console.log(this.name + " say Hello!");
		};
	}

	Base.prototype.showName = function () {
		console.log("My name is " + this.name);
	};

	function Sub() {
		this.name = "sub";
	}

	console.log('-------------------');
	console.log('util.inherits(constructor, superConstructor)是一个实现对象间原型继承 的函数。');
	util.inherits(Sub,Base);
	
	var objBase = new Base();
	objBase.showName();
	objBase.sayHello();
	console.log(objBase);

	var objSub = new Sub();
	console.log('-------------------');
	console.log('Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承。 同时，在原型中定义的属性不会被console.log 作 为对象的属性输出。');
	objSub.showName();
	// objSub.sayHello();
	console.log(objSub);

	console.log('-------------------');
	console.log('util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。');
	console.log(util.inspect(Base));
	console.log(util.inspect(Base, true));
	/*
	util.isArray(object)
	util.isRegExp(object)
	util.isDate(object)
	util.isError(object)
	Ref: http://nodejs.org/api/util.html 
	*/
}

if (TEST_GET_POST) {
	// 获取 GET  请求内容: 由于GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分，因此你可以手动解析后面的内容作为GET请求的参数。
	// See TEST_URL for example

	// 获取 POST 请求内容: POST 请求的内容全部的都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。
	var http = require('http');
	var queryString = require('querystring');
	var util = require('util');

	var formHTMLHeader = '<html><head><meta charset="utf-8"><title>Node.js 实例</title></head>' + '<body>';
	var formHTMLContent = '<form method="post">' +
  							'网站名： <input name="name"><br>' +
  							'网站 URL： <input name="url"><br>' +
  							'<input type="submit">';
  	var formHTMLFooter = '</body></html>';

  	http.createServer(function (request, response) {
  		// 定义了一个变量，用于暂存请求体的信息
  		var body = '';

		// console.log('--------------------------');
  		// 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
  		request.on('data', function(chunk) {
  			body += chunk;
  			// console.log("Data:\t" + util.inspect(body));
  			// console.log('--');
  		});

  		// 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
  		request.on('end', function() {
  			// 解析参数
  			// console.log("End:\t" + util.inspect(body));
  			body = queryString.parse(body); 
  			// console.log("Parsed:\t" + util.inspect(body));

  			// 设置响应头部信息及编码
  			response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})

  			if (body.name && body.url) {
  				response.write(formHTMLHeader + formHTMLContent);
        		response.write("<hr>");
  				response.write("网站名：\t" + body.name);
        		response.write("<br>");
        		response.write("网站 URL：\t" + body.url);
        		response.write(formHTMLFooter);
  			} else {
  				response.write(formHTMLHeader + formHTMLContent + formHTMLFooter);
  			}
  			response.end();
  		});

  	}).listen(8888);
}