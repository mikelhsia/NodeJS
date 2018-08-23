// Included in the myfirst.js
function route(pathname){
	if (!(pathname.slice(1,pathname.length) == 'favicon.ico')) {
		switch (pathname.slice(1,pathname.length)) {
			case '1':
				console.log("About to route a request for " + pathname);
				console.log('============================');
				break;
			case '2':
				console.log("2"+pathname);
				console.log('============================');
				break;
			default:
				console.log('Others: '+ pathname);
				console.log('============================');
		}
	}
}

exports.route = route;