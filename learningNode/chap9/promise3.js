let promise = require('bluebird');
let fs = promise.promisifyAll(require('fs'));

fs.readFileAsync('./apples.txt', 'utf8')
    .then(function(data) {
        /*
        The first processes the successful response to making the subdirectory,
        and the second creates the new file with the modified data
         */
        var adjData = data.replace(/apple/g, 'orange');
        return fs.mkdirAsync('./fruit/');
    })
    .then(function(adjData) {
        /*
        The new directory is made using the promisifyed mkdirAsync() function,
        which is returned at the end of the process. This is the key to making the
        promises work, because the next then() function is actually attached to the
        returned function.
         */
        return fs.writeFileAsync('./fruit/oranges.txt', adjData);
    })
    .catch(function(error) {
        console.error(error);
    });