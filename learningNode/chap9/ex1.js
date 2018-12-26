let InputChecker = require('./class').InputChecker;

// Testing new object and event handling
let ic = new InputChecker('Shelly', 'output');
// console.log(ic.name);
// console.log(ic.writeStream);

// ic.on('write', (data) => {
// Can't use arrow function since this will affect 'this' to work properly
// arrow function is a anonymous function that 'this' doesn't work
ic.on('write', function (data) {
    this.writeStream.write(data, 'utf8');
});

ic.addListener('echo', function (data) {

    console.log(this.name + ' wrote: ' + data);
});

ic.on('end', function () {
    process.exit();
});

process.stdin.setEncoding('utf8');
process.stdin.on('data', (input) => {
    ic.check(input);
});