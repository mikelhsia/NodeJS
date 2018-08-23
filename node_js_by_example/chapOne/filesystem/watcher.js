'use strict';

// 1. Watch target.txt
// 2. Implement argv
// 3. Spawning a child process

const fs = require('fs');
const filename = process.argv[2];
const spawn = require('child_process').spawn;

if (!filename) {
    throw Error('A file to wath must be specified');
}

fs.watch(filename, () => {
    let ls = spawn('ls', ['-l', '-h', filename]);
    let output = '';

    // ls.stdout.pipe(process.stdout);

    // The on() method adds a listener for the specified event type. We listen for data
    // data events in particular pass along a Buffer object.
    // Each time we get a chunk of data, we append it to our output.
    // events because we’re interested in data coming out of the stream.
    // A Buffer is Node.js’s way of representing binary data.3
    // It points to a blob of memory allocated by Node.js’s native core, outside of the JavaScript engine.
    ls.stdout.on('data', chunk => output += chunk);

    ls.on('close', () => {
        const parts = output.split(/\s+/);
        console.log([parts[0], parts[4], parts[8]]);
    });
});

console.log(`Now watching ${filename} for changes...`);
