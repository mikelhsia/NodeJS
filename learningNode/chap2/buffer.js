"use strict"
// let buf = new Buffer(24); <- this is Deprecated
let buf = Buffer.alloc(24);
buf.fill(0);  // fills buffer with zeros

// Pass str into buff
let str = 'New String';
let buf2 = Buffer.from(str);

console.log(buf);
console.log(buf2);

console.log('------');

let a = [1,2,3];
let b = Buffer.from(a);

console.log(b);

let a2 = new Uint8Array([1,2,3]);
let b2 = Buffer.from(a2);

console.log(b2);

let b3 = Buffer.alloc(10);

console.log(b3);

let b4 = Buffer.allocUnsafe(10);

console.log(b4);

console.log('------');

let buff = Buffer.from('This is my pretty example');
let json = JSON.stringify(buff);

console.log(json);
