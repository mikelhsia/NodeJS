// console.log();
// console.info();
// console.error();
// console.warn();
// console.dir();
// console.time();
// console.timeEnd();
// console.trace();
// console.assert();

/*
Writing into an HTML element, using innerHTML.
Writing into the HTML output using document.write().
Writing into an alert box, using window.alert().
Writing into the browser console, using console.log().
*/

var val = document.getElementById("Text4");
var reg = new RegExp("[0-9a-zA-Z]+");
function print() {
	//val=val.replace(/[^/u4E00-/u9FA5]/g,'');
	var s = val.value;
	if(reg.test(s)){
		alert(s + " (invalid) !请输入汉字");
	}
}

function image_on_click() {
	var image_button= document.getElementById('popup_window_img'); 
	image_button.visibility = "visible";
}

function myFunction() {
   document.getElementById("demo").innerHTML = "Paragraph changed.";
}
/**************************/
/* Avoid String, Number, and Boolean objects. They complicate your code and slow down execution speed. */
var person = {
	firstName:"John", 
	lastName:"Doe", 
	age:50, 
	eyeColor:"blue"
};

console.log("Person object: " + person.firstName + ' ' + person.lastName);

/* <some-HTML-element some-event='some JavaScript'> */
/*
	Event		Description
	onchange	An HTML element has been changed
	onclick		The user clicks an HTML element
	onmouseover	The user moves the mouse over an HTML element
	onmouseout	The user moves the mouse away from an HTML element
	onkeydown	The user pushes a keyboard key
	onload		The browser has finished loading the page
*/


// (x == y) is true because x and y have equal values
// (x === y) is false because x and y have different types (string and object)
var x = "John";             
var y = new String("John");

// (x == y) is false because x and y are different objects
// (x === y) is false because x and y are different objects
// Comparing two JavaScript objects will always return false.
var x = new String("John");             
var y = new String("John");

/* String
	... 
	slice(start, end)
	substring(start, end)
	substr(start, length)
	replace(target, replacement)
*/
var str = "Please locate where 'locate' occurs!";
var pos = str.indexOf("locate");
console.log("Index pos of 'locate': " + pos);

pos = str.lastIndexOf("locate");
console.log("Last index pos of 'locate': " + pos);

pos = str.search("locate");
console.log("Search pos of 'locate': " + pos);

console.log("charAt: " + str.charAt(0)); 
console.log("charCodeAt: " + str.charCodeAt(0)); 

/* Convert String into Array */
var txt = "a,b,c,d,e";   // String
txt.split(",");          // Split on commas
txt.split(" ");          // Split on spaces
txt.split("|");          // Split on pipe
txt.split("");           // Split in characters

/* Javascript numbers 
	JavaScript numbers are always stored as double precision floating point numbers, 
	following the international IEEE 754 standard. This format stores numbers in 64 bits, 
	where the number (the fraction) is stored in bits 0 to 51, the exponent in bits 52 to 62, 
	and the sign in bit 63:
Value (aka Fraction/Mantissa)		Exponent				Sign
52 bits (0 - 51) 					11 bits (52 - 62)		1 bit (63)

Precision:
	Integers 	(Numbers without a period or exponent notation) are considered accurate up to 15 digits.
	Float 		The maximum number of decimals is 17, but floating point arithmetic is not always 100% accurate:
	hexadecimal JavaScript interprets numeric constants as hexadecimal if they are preceded by 0x.

Infinity: 
typeof Infinity;        // returns "number"

NaN:
NaN - Not a Numbero

Number Method:
toString(): 		(100 + 23).toString();
toExponential():    x.toExponential(2);
toFixed(): 			x.toFixed(4);           // returns 9.6560
x.toPrecision(): 	x.toPrecision(4);       // returns 9.656
valueOf():          (100 + 23).valueOf();   // returns 123 from expression 100 + 23

There are 3 JavaScript methods that can be used to convert variables to numbers:
The Number() Method 		Can be used to convert JavaScript variables to numbers
The parseInt() Method 		Parses a string and returns a whole number. Spaces are allowed. Only the first number is returned
The parseFloat() method 	Parses a string and returns a number. Spaces are allowed. Only the first number is returned

Number Properties:
Property				Description
MAX_VALUE				Returns the largest number possible in JavaScript
MIN_VALUE				Returns the smallest number possible in JavaScript
NEGATIVE_INFINITY		Represents negative infinity (returned on overflow)
NaN						Represents a "Not-a-Number" value
POSITIVE_INFINITY		Represents infinity (returned on overflow)

Ex: var x = Number.MAX_VALUE;
*/

/* Math
	Math.PI;            // returns 3.141592653589793
	Math.round(4.7);    // returns 5
	Math.pow(8, 2);     // returns 64
	Math.sqrt(64);      // returns 8
	Math.abs(x) returns the absolute (positive) value of x:
	Math.random();  
 */
 /* A Proper Random Function */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// In some browsers, months or days with no leading zeroes may produce an error:
var date = new Date();
/* Avoid new Array
	var points = new Array();         // Bad
	var points = [];                  // Good 
	var points = new Array(40, 100);  // Creates an array with two elements (40 and 100)
	var points = new Array(40);       // Creates an array with 40 undefined elements !!!!!
*/
/* If using name index, would be impossible to identify the length of the array
	var person = [];
	person["firstName"] = "John";
	person["lastName"] = "Doe";
	person["age"] = 46;
	var x = person.length;         // person.length will return 0
	var y = person[0];             // person[0] will return undefined
*/
/* Definition of Array and Object in Javascript
 * JavaScript does not support associative arrays.
 * You should use objects when you want the element names to be strings (text).
 * You should use arrays when you want the element names to be numbers.
 */
var fruits, text, fLen;
fruits = ["Banana", "Orange", "Apple", "Mango"];

var get_fruit_basket = function () {

	text = "<ul>";
	for (var i = 0; i < fruits.length; i++) {
		if (i !== (fruits.length - 1)) {
		    text += "<li>" + fruits[i] + "</li>";
		} else {
		    text += "<li class='lastNode add_border'>" + fruits[i] + "</li>";
		}
	};
	text += "</ul>";

	// text = "<ul><li>";
	// text += fruits.join("</li><li>");
	// text += "</li></ul>";
}
get_fruit_basket();

document.getElementById('demo').innerHTML = "Fruits basket: " + text;
// document.getElementById("demo").innerHTML = fruits.toString();

var fruit_basket_add = function () {
	fruits.push("Random fruit");
	get_fruit_basket();
	document.getElementById('demo').innerHTML = "Fruits basket: " + text;
	$('.lastNode').hide();
	$('.lastNode').fadeIn(600);
}

var fruit_basket_remove = function () {
	// JQuery function
	$('.lastNode').fadeOut(600, function() {
		var len = document.getElementById('demo').getElementsByTagName('li').length;
		fruits.pop();
		get_fruit_basket();
		document.getElementById('demo').innerHTML = "Fruits basket: " + text;
	});
}

/* Array Methods 
	Array.push(para);
	Array.pop();
	Array.shift();             
		* Removes the first element "Banana" from fruits, Returns first element
	Array.unshift("Lemon");    
		* Adds a new element "Lemon" to fruits head, Returns array length
	Array.isArray(para);
	para instanceof Array 	
		* returns true
	array.toString();		
		* Convert array to string
	array.join(" * ");			
		* The join() method also joins all array elements into a string.
	delete fruits[0];           
		* Changes the first element in fruits to undefined
		* Using delete may leave undefined holes in the array. Use pop() or shift() instead
	fruits.splice(2, 0, "Lemon", "Kiwi");
		* The first parameter (2) defines the position where new elements should be added (spliced in).
		* The second parameter (0) defines how many elements should be removed.
		* The rest of the parameters ("Lemon" , "Kiwi") define the new elements to be added.
	var myChildren = arr1.concat(arr2, arr3);
		* concat() method creates a new array by concatenating two arrays
	var citrus = fruits.slice(1, 3);
		* The slice() method slices out a piece of an array into a new array.
		* The slice() method creates a new array. It does not remove any elements from the source array.
	fruits.sort();            
		* Sorts the elements of fruits 
		* EX: points.sort(function(a, b){return a - b});	
		* Compare function as argument
		* Object can use the same function to sort the objects in the object array
	fruits.reverse();         
		* Reverses the order of the elements
*/

/*
	The constructor property returns the constructor function for all JavaScript variables.
		* "John".constructor                 // Returns "function String()  { [native code] }"
		* (3.14).constructor                 // Returns "function Number()  { [native code] }"
		* false.constructor                  // Returns "function Boolean() { [native code] }"
		* [1,2,3,4].constructor              // Returns "function Array()   { [native code] }"
		* {name:'John', age:34}.constructor  // Returns" function Object()  { [native code] }"
		* new Date().constructor             // Returns "function Date()    { [native code] }"
		* function () {}.constructor         // Returns "function Function(){ [native code] }"
*/

console.log("Today's datetime" + Date().toString());


/* Javascript bitwise
	Operator	Description				Example		Same as			Result		Same as
	&			AND						5 & 1		0101 & 0001	 	1			0001
	|			OR						5 | 1		0101 | 0001	 	5			0101
	~			NOT						~ 5	 		~0101	 		10			1010
	^			XOR						5 ^ 1		0101 ^ 0001	 	4			0100
	<<			Zero fill left shift	5 << 1		0101 << 1	 	10			1010
	>>			Signed right shift		5 >> 1		0101 >> 1	  	2			0010
	>>>			Zero fill right shift	5 >>> 1		0101 >>> 1	  	2			0010
	***********************************************************************************
	* The examples above uses 4 bits unsigned examples. But JavaScript uses 32-bit signed numbers.
	* Because of this, in JavaScript, ~ 5 will not return 10. It will return -6.
	* ~00000000000000000000000000000101 will return 11111111111111111111111111111010
	***********************************************************************************
*/

/* Javascript Performance */
/***********************************************************************************/
/* 1. Reduce Activity in Loops */
// Bad:
/*
	var i;
	for (i = 0; i < arr.length; i++) {
*/
// Good:
/*
	var i;
	var l = arr.length;
	for (i = 0; i < l; i++) {
	}
*/

/* 2. Reduce DOM Access */
/* Accessing the HTML DOM is very slow, compared to other JavaScript statements.
 * If you expect to access a DOM element several times, access it once, and use it as a local variable
 */

/* 3. Reduce DOM Size */
/* Keep the number of elements in the HTML DOM small.
   This will always improve page loading, and speed up rendering (page display), 
   especially on smaller devices.
   Every attempt to search the DOM (like getElementsByTagName) will benefit from a smaller DOM.
*/

/* 4. Avoid Unnecessary Variables
   Don't create new variables if you don't plan to save values.
   Often you can replace code like this:*/
//	var fullName = firstName + " " + lastName;
//	document.getElementById("demo").innerHTML = fullName;
/* Better code: */
//	document.getElementById("demo").innerHTML = firstName + " " + lastName;


/* Javascript HTML DOM */
/* Changing HTML Elements
	Method										Description
	element.innerHTML =  new html content		Change the inner HTML of an element
	element.attribute = new value				Change the attribute value of an HTML element
	element.setAttribute(attribute, value)		Change the attribute value of an HTML element
		element.style.property = new style	Change the style of an HTML element 
	********************************************************************************
   Adding and Deleting Elements
	Method									Description
	document.createElement(element)			Create an HTML element
	document.removeChild(element)			Remove an HTML element
	document.appendChild(element)			Add an HTML element
	document.replaceChild(element)			Replace an HTML element
	document.write(text)					Write into the HTML output stream
	********************************************************************************
   Adding Events Handlers
	Method													Description
	document.getElementById(id).onclick = function(){code}	Adding event handler code to an onclick event
*/

var collapseItemArray = document.getElementsByTagName('a');
var collapseItemArrayLength = collapseItemArray.length;
for (var i = 0; i < collapseItemArrayLength; i++) {
	if (collapseItemArray[i].hasAttributes('data-toggle')) {
		collapseItemArray[i].addEventListener('click',changeCollapseArrowDirection);
	}
}

function changeCollapseArrowDirection () {
	var classArray = this.getElementsByTagName("span")[0].className.split(' ');
	for (var i=0; i < classArray.length; i++) {
		if (classArray[i] == 'caret') {
			classArray.pop();
			this.getElementsByTagName("span")[0].className = classArray.toString();
			this.getElementsByTagName("span")[0].innerHTML = "-";
			return;
		}
	}
	classArray.push("caret");
	this.getElementsByTagName("span")[0].innerHTML = "";
	this.getElementsByTagName("span")[0].className = classArray.toString().replace(',',' ');
}


/*
Property							Description	DOM
document.anchors					Returns all <a> elements that have a name attribute	1
document.applets					Returns all <applet> elements (Deprecated in HTML5)	1
document.baseURI					Returns the absolute base URI of the document	3
document.body						Returns the <body> element	1
document.cookie						Returns the document's cookie	1
document.doctype					Returns the document's doctype	3
document.documentElement			Returns the <html> element	3
document.documentMode				Returns the mode used by the browser	3
document.documentURI				Returns the URI of the document	3
document.domain						Returns the domain name of the document server	1
document.domConfig					Obsolete. Returns the DOM configuration	3
document.embeds						Returns all <embed> elements	3
document.forms						Returns all <form> elements	1
document.head						Returns the <head> element	3
document.images						Returns all <img> elements	1
document.implementation				Returns the DOM implementation	3
document.inputEncoding				Returns the document's encoding (character set)	3
document.lastModified				Returns the date and time the document was updated	3
document.links						Returns all <area> and <a> elements that have a href attribute	1
document.readyState					Returns the (loading) status of the document	3
document.referrer					Returns the URI of the referrer (the linking document)	1
document.scripts					Returns all <script> elements	3
document.strictErrorChecking		Returns if error checking is enforced	3
document.title						Returns the <title> element	1
document.URL						Returns the complete URL of the document	1
*/

function myMove() {
    var elem = document.getElementById("animation"); 
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame() {
        if (pos == 350) {
            // clearInterval(id);
            pos = 0;
        } else {
            pos++; 
            elem.style.top = pos + 'px'; 
            elem.style.left = pos + 'px'; 
        }
    }
}


document.getElementById("xxx").innerHTML = document.getElementById("button2").nodeName;


$(document).ready(function() {
    $(window).resize(function() {
        var bodyheight = $(this).height();
        $("#sidebar").height(bodyheight);
        console.log(bodyheight);
    }).resize();
});

/*
Screen ----
screen.width
screen.height
screen.availWidth
screen.availHeight
screen.colorDepth
screen.pixelDepth
-------------------------------
Location ------
window.location.href returns the href (URL) of the current page
window.location.hostname returns the domain name of the web host
window.location.pathname returns the path and filename of the current page
window.location.protocol returns the web protocol used (http: or https:)
window.location.assign loads a new document
-------------------------------
History ------
history.back() - same as clicking back in the browser
history.forward() - same as clicking forward in the browser
-------------------------------
Navigator ------
navigator.appName
navigator.appCodeName
navigator.platform
-------------------------------
Timing ------
setTimeout(function, milliseconds): Executes a function, after waiting a specified number of milliseconds.
setInterval(function, milliseconds): Same as setTimeout(), but repeats the execution of the function continuously.
-------------------------------
 */

 /* Ajax testing
XMLHttpRequest Object Methods
------------------------------------------------
Method									Description
new XMLHttpRequest()					Creates a new XMLHttpRequest object
abort()									Cancels the current request
getAllResponseHeaders()					Returns header information
getResponseHeader()						Returns specific header information
open(method, url, async, user, psw)		Specifies the request
											method: the request type GET or POST
											url: the file location
											async: true (asynchronous) or false (synchronous)
											user: optional user name
											psw: optional password
send()									Sends the request to the server Used for GET requests
send(string)							Sends the request to the server. Used for POST requests
setRequestHeader()						Adds a label/value pair to the header to be sent
 */
 /* Ajax 
XMLHttpRequest Object Properties
-------------------------------------------------
Property				Description
onreadystatechange		Defines a function to be called when the readyState property changes
readyState				Holds the status of the XMLHttpRequest.
							0: request not initialized 
							1: server connection established
							2: request received 
							3: processing request 
							4: request finished and response is ready
responseText			Returns the response data as a string
responseXML				Returns the response data as XML data
status					Returns the status-number of a request
							200: "OK"
							403: "Forbidden"
							404: "Not Found"
						For a complete list go to the Http Messages Reference
statusText				Returns the status-text (e.g. "OK" or "Not Found")
 */
 /*
	In order not to get a cached result, use the following 
	xhttp.open("GET", "demo_get.asp?t=" + Math.random(), true);
	xhttp.send();
	** Important: URL is always an address to a file on a server
 */
function loadDoc(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("ajax_demo").innerHTML = this.responseText;
			console.log("Ajax ready!");
		}
	};	

	xhttp.open("GET", "localhost:8080/ajax_info.txt?year=2017&month=Feb", true);
	xhttp.send();
	// xhttp.open("POST", "ajax_test.asp", true);
	// xhttp.setRequestHeader("Content-type", "localhost:8080?year=2017&month=Feb");
	// xhttp.send("fname=Henry&lname=Ford");
}