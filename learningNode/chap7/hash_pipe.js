/*
crypto hash pipe
 */
let crypto = require('crypto'),
    fs = require('fs'),
    hash = crypto.createHash('sha256');
// Can also identify the method with MD5 with following string
// hash = crypto.createHash('md5');

hash.setEncoding('hex');

let input = fs.createReadStream('main.txt');
let output = fs.createWriteStream('mainhash.txt');

input.pipe(hash).pipe(output);

