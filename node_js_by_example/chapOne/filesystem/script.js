/*
require module book.js
var book = require('./book.js');
console.log('Name: ' + book.name);
book.read();


// require caches the object that is returned
var bookA = require('./book.js');
var bookB = require('./book.js');
bookA.rate(10);
bookB.rate(20);
console.log(bookA.getPoints(), bookB.getPoints());  // You'll see '20 20' instead of '10 20'
*/

// Require return function to create objects instead of return object directly
var bookA = require('./book.js')();
var bookB = require('./book.js')();
bookA.rate(10);
bookB.rate(20);
console.log(bookA.getPoints(), bookB.getPoints());  
