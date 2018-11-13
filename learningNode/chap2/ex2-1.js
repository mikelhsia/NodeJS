// 输入进入流模式（flowing-mode，默认关闭，需用resume开启），
// 注意开启后将无法read到数据
// 见 https://github.com/nodejs/node-v0.x-archive/issues/5813

process.stdin.resume();

process.stdin.on('data', function(chunk) {
    if (chunk !== null) {
        // echo the text
        process.stdout.write('Echo: ' + chunk.toString());

        var command = chunk.toString().trim();
        if (command == 'exit') {
            process.exit(0);
        }
    }
});
