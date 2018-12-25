/*
Using processes to find files in subdirectories with a given search term, 'test'
 */

let spawn = require('child_process').spawn,
    find = spawn('find', ['.', '-ls']),
    grep = spawn('grep', ['test']),
    ps = spawn('ps', ['ax']),
    grep2 = spawn('grep', ['--line-buffered', 'apache2']);

grep.stdout.setEncoding('utf8');

// pipe find output to grep input
find.stdout.pipe(grep.stdin);

// now run grep and output results
grep.stdout.on('data', (data) => {
    console.log(data);
});

// err handling for both
find.stderr.on('data', (data) => {
    console.log('find stderr: ' + data);
});

grep.stderr.on('data', (data) => {
    console.log('grep stderr: ' + data);
});

// and exit handling for both
find.on('close', (code) => {
    if (code !== 0) {
        console.log('find process exited with code ' + code);
    }
});

grep.on('close', (code) => {
    if (code !== 0) {
        console.log('grep process exited with code ' + code);
    }
});

ps.stdout.pipe(grep2.stdin);

ps.stderr.on('data', (data) => {
    console.log('ps stderr: ' + data);
});

grep2.stdout.on('data', (data) => {
    console.log('' + data);
});

grep2.stderr.on('data', (data) => {
    console.log('grep stderr: ' + data);
});

ps.on('close', (code) => {
    if (code !== 0) {
        console.log('ps process exited with code ' + code);
    }
});

grep2.on('close', (code) => {
    if (code !== 0) {
        console.log('grep process exited with code ' + code);
    }
});