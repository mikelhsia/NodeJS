"use strict";

let buf = Buffer.from('This is my pretty example');
let json = JSON.stringify(buf);
let buf2 = Buffer.from(JSON.parse(json).data);

console.log(buf2.toString()); // This is my pretty example
console.log(buf2.toString('utf8', 11, 17)); // pretty

let StringDecoder = require('string_decoder').StringDecoder;
let decoder = new StringDecoder('utf8');

let euro = Buffer.from([0xE2, 0x82]);
let euro2 = Buffer.from([0xAC]);
let euro3 = Buffer.alloc(3);
euro3.write('€', 'utf-8');

console.log(decoder.write(euro) + '(' + euro.length + ')');
console.log(decoder.write(euro2) + '(' + euro2.length + ')');
console.log(decoder.write(euro3) + '(' + euro3.length + ')');

console.log(euro.toString());
console.log(euro2.toString());

// -------------
// Buffer manipulation
var buf3 = Buffer.alloc(4);

// write values to buffer
buf3.writeUInt8(0x63, 0);
buf3.writeUInt8(0x61, 1);
buf3.writeUInt8(0x74, 2);
buf3.writeUInt8(0x73, 3);

console.log(buf3.toString());
