#!/usr/local/bin/node
/*
The child_process.exec() method is similar to child_process.spawn() except that
spawn() starts returning a stream as soon as the program executes, as noted in
Example 8-1. The child_process.exec() function, like child_process.execFile(),
buffers the results. However, exec() spawns a shell to process the application,
unlike child_process.execFile(), which directly runs the process. This makes
child_process.execFile() more efficient than either child_process.spawn() with
the shell option set or child_process.exec().
 */


/*
The difference is that child_process.exec() spawns a shell,
whereas the child_process.execFile() function does not.
 */
// console.log(global);

let execfile = require('child_process').execFile,
    child;

child = execfile('./app', (error, stdout, stderr) => {
    if (error == null) {
        console.log('stdout: ' + stdout);
    }
});

let exec = require('child_process').exec,
    child2;

child2 = exec('./app', (error, stdout, stderr) => {
    if (error) {
        return console.error(error);
    }
    console.log('stdout: ' + stdout);
});

/*
The child_process.execFile() has an additional parameter: an array of command-line options to pass to the application.
The equivalent application using this function is:
 */
let exec2 = require('child_process').exec,
    child3;

child3 = exec2('node commanderZip.js -s phoenix5a.png -f phoenix5azip.png', {cwd: '/Users/michael/NodeJS/learningNode/chap6'}, (error, stdout, stderr) => {
    if (error) {
        return console.error(error);
    }
    console.log('stdout: ' + stdout);
});