// Timer 1
/* 
setTimeout( (name) => {
    console.log('Hello ' + name);
}, 3000, 'Shelley');
*/

// Timer 2
/*
var timer1 = setTimeout( (name) => {
    console.log('Hello '+ name);
}, 30000, 'Shelley');

setTimeout(function(timer) {
    clearTimeout(timer);
    console.log('cleared timer');
}, 3000, timer1);

console.log('Waiting on timer');
*/

// Timer 3
/*
var interval = setInterval( (name) => {
    console.log('Hello ' + name);
}, 1000, 'Shelly');

setTimeout( (intervalFunc) => {
    clearInterval(intervalFunc);
    console.log('cleared timer');
}, 10000, interval);

console.log('waiting on first interval');
*/

// Timer 4
// unref() on a timer, and it’s the only event in the event queue, the timer is cancelled and the program is allowed to terminate. If you call ref() on the same timer object, this keeps the program going until the timer has processed.
/*
var timer = setTimeout( (name) => {
    console.log('Hello ' + name);
}, 10000, 'Shelley');

timer.unref();
// timer.ref();

console.log('Waiting on timer...');
*/


// Timer 5
/*
var interval = setInterval( (name) => {
    console.log('Hello ' + name);
}, 1000, 'Michael');

var timer = setTimeout( (interval) => {
    clearInterval(interval);
    console.log('cleared timer');
}, 10000, interval);

timer.unref();

console.log('waiting on first interval...');
*/

// Timer 6
// setImmediate() and clearImmediate()

