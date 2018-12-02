var fs = require('fs'),
    async = require('async'),
    path = require('path'),
    _dir = './data/';

// TODO: 1. You can't call callback in waterfall multiple times
// TODO: 2. Somehow fs.stat(_dir+file ...) doesn't get triggered.
//      That's because fs.stat is also an asynchronous function

var writeStream = fs.createWriteStream('./log.txt', {
    'flags': 'a',
    'encoding': 'utf8',
    'mode': 0666
});

async.waterfall([
    function readDir(callback) {
        console.log('readDir');
        fs.readdir(_dir, function (err, files) {
            console.log(files);
            callback(err, files);
        });
    },
    function loopFiles(files, callback) {
        console.log('looping Files');
        console.log(files);
        files.forEach(function (name) {
            console.log('loop file');
            console.log(name);
            callback(null, name);
        });
    },
    function checkFile(file, callback) {
        console.log('checkFile');
        console.log(_dir+file);

        // fs.stat(_dir+file, function(err, stats) {
        //     console.log('In');
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log(_dir+file + ' existed');
        //         callback(err, stats, file);
        //     }
        // });
        var stats = null;

        try {
            stats = fs.statSync(_dir + file);
        } catch (e) {
            console.error(e);
            return;
        }

        callback(null, stats, file);
    },
    function readData(stats, file, callback) {
        console.log('reading data');
        if (stats.isFile()) {
            console.log('reading file: ' + _dir + file);
            fs.readFile(_dir + file, 'utf8', function(err, data) {
                callback(err, file, data);
            });
        }
    },
    function modify(file, text, callback) {
        var adjdata = text.replace(/somecompany\.com/g, 'burningbird.net');
        callback(null, file, adjdata);
    },
    function writeData(file, text, callback) {
        fs.writeFile(_dir + file, text, function(err) {
            callback(err, file);
        });
    },
    function logChange(file, callback) {
        writeStream.write('changed ' + file + '\n', 'utf8', function (err) {
            callback(err);
        });
    }
], function (err) {
    if (err) {
        console.error(err.message);
    } else {
        console.log('modified files');
    }
});
