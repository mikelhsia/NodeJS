var express = require('express');
var fs = require('fs');
var url = require('url');
var queryString = require('querystring');
var util = require('util');
var app = express();

var verifyAddUser = function (usr) {
	if (usr.name && usr.password && usr.profession && usr.id) {
		return true;
	} 
	return false;
}

var verifyDeleteUser = function (usr) {
	if (usr.id) {
		return true;
	} 
	return false;
}

var getNextJsonLength = function (obj) {
	var len = 0;
	for (x in obj) {
		len++;
	} 
	return len+1;
}

app.get('/listUsers', function(req,res) {
	fs.readFile(__dirname + '/users.json', 'utf8', function(err, data) {
		// console.log(data);
		res.end(data);
	});
});

app.get('/addUser', function(req,res) {

	/*** Synchronuous 同步 ***/
	var usersJson = fs.readFileSync(__dirname + '/users.json', 'utf8');
	if (usersJson) {
		usersJson = JSON.parse(usersJson);
	}
	// console.log(usersJson);

	var addUser = queryString.parse(url.parse(req.url).query);
	var flag = verifyAddUser(addUser);
	if (!flag) {
		res.end("You're missing user information in the URL.");
	}


	usersJson['user'+getNextJsonLength(usersJson)] = addUser;

	// console.log(queryString.parse(url.parse(req.url).query));
	// console.log("Typeof QueryString: "+typeof(queryString.parse(url.parse(req.url).query)));
	fs.writeFile(__dirname + '/users.json', JSON.stringify(usersJson), 'utf8', function (err) {
		if (err) {
			console.log(err);
		}
	});
	res.end(JSON.stringify(usersJson));

});

// URL 现在包含了标记 :id ，Express 可以创建动态的 URL ，用于对应请求参数。
app.get('/user:id', function(req,res){
	fs.readFile(__dirname + '/users.json', 'utf8', function(err, data) {
		data = JSON.parse(data);
		// req.params.id to get the dynamically generated ID on URL
		var user = data['user'+req.params.id];
		res.end(JSON.stringify(user));
		// console.log(user);
	});
});


app.get('/deleteUser', function(req,res) {
	/*** Synchronuous 同步 ***/
	var usersJson = fs.readFileSync(__dirname + '/users.json', 'utf8');
	if (usersJson) {
		usersJson = JSON.parse(usersJson);
	}
	// console.log(usersJson);

	var deleteUser = queryString.parse(url.parse(req.url).query);
	var flag = verifyDeleteUser(deleteUser);
	if (!flag) {
		res.end("You're missing user information in the URL.");
	}

	// console.log(queryString.parse(url.parse(req.url).query));
	// console.log("Typeof QueryString: "+typeof(queryString.parse(url.parse(req.url).query)));

	delete usersJson['user' + deleteUser.id];
	
	fs.writeFile(__dirname + '/users.json', JSON.stringify(usersJson), 'utf8', function (err) {
		if (err) {
			console.log(err);
		}
	});
	res.end(JSON.stringify(usersJson));
	// console.log(JSON.stringify(usersJson));
});

var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Restful API Node.js server started, address => http://%s:%s", host, port)
});