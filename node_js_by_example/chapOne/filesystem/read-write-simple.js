'use strict';

const fs = require('fs');
let str = '';

fs.readFile('target.txt', (err, data) => {
    if(err) {
        throw err;
    }
    str = data.toString();
    console.log(data.toString());
});

fs.writeFile('target1.txt', str, (err, data) => {
    if (err) {
        throw err;
    }
    console.log('File saved!');
});
