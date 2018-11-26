/**
 * Creating an Asynchronous callback function
 */

var fib = function (n) {
    if (n < 2) return n;
    return fib(n-1) + fib(n-2);
}

var Obj = function() {}

Obj.prototype.doSomething = function(arg1_) {
    var callback_ = arguments[arguments.length - 1];

    callback = (typeof(callback_) == 'function' ? callback_ : null);
    var arg1 = typeof arg1_ === 'number' ? arg1_ : null;

    if (!arg1) return callback(new Error('first arg missing or not a number'));

    /*
     * To ensure this callback is asynchronous, we call it within a process.nextTick() function
     * process.nextTick() ensures the event loop is cleared before the function is called
     * This means all of the synchronous functionality is processed before the blocking functionality 
     * (if any) is invoked. 
     * */
    process.nextTick(function () {
        // block on CPU
        var data = fib(arg1);
        callback(null, data);
    });
}


var test = new Obj();
var number = 10;
// var number = 'x';

test.doSomething(number, function(err, value) {
    if (err)
        console.error(err);
    else
        console.log('Fibonaci value for ' + number + ' is ' + value);
});

console.log('called doSomething');

// This is call 'errback'
function xx (err, arg2) {
    if (err)
        console.error(err);
}

xx(new Error('Unexpected'));
xx(123);
