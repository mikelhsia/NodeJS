let spawn = require('child_process').spawn,
    pwd = spawn('pwd');
    // pwd = spawn('pwd', ['-g']);

pwd.stdout.on('data', (data) => {
    console.log('stdout: ' + data);
});

pwd.stderr.on('data', (data) => {
    console.error('stderr: ' + data);
});

pwd.on('close', (code) => {
    console.log('child process exited with code ' + code);
});