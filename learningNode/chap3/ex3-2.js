"use strict";

var util = require('util');
var eventEmitter = require('events').EventEmitter;
var fs = require('fs');

exports.InputChecker = InputChecker;

function InputChecker (name, file) {
    this.name = name;
    this.writeStream = fs.createWriteStream('./' + file + '.txt', {
        'flag': 'a', 
        'encoding': 'utf8',
        'mode': 0o666
    });
}


util.inherits(InputChecker, eventEmitter);

InputChecker.prototype.check = function (input) {
    // trim extraneous white space
    var command = input.trim().substr(0, 3);

    // process command
    // if wr, write input to file
    if (command == 'wr:') {
        this.emit('write', input.substr(3, input.length));
    } else if (command == 'en:') {
        // if en, end process
        this.emit('end');
    } else {
        // just echo back to standard output
        this.emit('echo', input);
    }
};
