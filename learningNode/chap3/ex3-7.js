var fs = require('fs'),
    async = require('async');

async.parallel({
    data1: function (callback) {
        fs.readFile('./data/1.txt', 'utf8', function (err, data) {
            callback(err, data);
        });
    },
    data2: function (callback) {
        fs.readFile('./data/2.txt', 'utf8', function(err, data) {
            callback(err, data);
        });
    },
    data3: function readData3(callback) {
        fs.readFile('./data/3.txt', 'utf8', function (err, data) {
            callback(err, data);
        });
    },
}, function(err, result) {
    if (err) {
        console.log(err.message);
    } else {
        console.log(result);
    }
});