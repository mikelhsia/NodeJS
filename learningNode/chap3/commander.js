var program = require('commander');

program.version('0.0.1')
.option('-s, --source [web site]', 'Source website')
.option('-f, --file [file name]', 'File name')
.option('-i, --integer <n>', 'An integer argument', parseInt)
.option('-d, --dring [drink]', 'Drink', /^(coke|pepsi|izze)$/i)
/*
.command('keyword <keyword> [otherKeywords...]')
.action(function (keyword, otherKeywords) {
    console.log('keyword %s', keyword);
    if (otherKeywords) {
        otherKeywords.forEach(function (oKey) {
            console.log('keyword %s', oKey);
        });
    }
})
*/
.parse(process.argv);

console.log('Source website: ' + program.source);
console.log('File name: ' + program.file);
