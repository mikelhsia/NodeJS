// exports.myDateTime = function () {
//     return Date();
// };

function Hello() {
	var name;
	this.setName = function(thyName) {
		name = thyName;
	}

	this.getName = function() {
		console.log("Hello " + name);
	}
}

module.exports = Hello;