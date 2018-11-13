"use strict";

function buffCheck(buf1, buf2) {
    if (buf1.equals(buf2)) {
        console.log('[Info]: buffers are equal');
    } else {
        console.log('[Info]: ]buffers are not equal');
    }
}

var buf1 = Buffer.from('this is the way we build our buffer');
var lnth = buf1.length;

// create new buffer as slice of old
var buf2 = buf1.slice(19, lnth);
console.log(buf2.toString()); // build our buffer
buffCheck(buf1, buf2);

// modify second buffer
buf2.fill('*', 0, 5);
console.log(buf2.toString()); // ***** our buffer
buffCheck(buf1, buf2);

// show impact on first buffer
console.log(buf1.toString()); // this is the way we ***** our buffer

let buf3 = Buffer.from('this is a new buffer with a string');

// copy buffer
var buf4 = Buffer.alloc(10);
buf3.copy(buf4);

console.log(buf4.toString());


var b1 = Buffer.from('1 is number one');
var b2 = Buffer.from('2 is number two');
var b3 = Buffer.alloc(b1.length);
b1.copy(b3);

console.log(b1.compare(b2));
console.log(b2.compare(b1));
console.log(b1.compare(b3));

