// This is identical to promise1.js
let promise = require('bluebird');
let fs = promise.promisifyAll(require('fs'));

fs.readFileAsync('./apples.txt', 'utf8')
    .then(function (data) {
        let adjData = data.replace(/apple/g, 'orange');
        return fs.writeFileAsync('./oranges.txt', adjData);
    })
    .catch(function(error) {
        console.error(error);
    });