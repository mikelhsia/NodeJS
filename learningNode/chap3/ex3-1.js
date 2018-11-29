var vm = require('vm');

global.count1 = 100;
var count2 = 100;

var txt = `if (count1 === undefined) {
                var count1 = 0;
            }
            count1++;
            if (count2 === undefined) {
                var count2 = 0; 
            } 
            count2++;
            console.log(count1); 
            console.log(count2);`


var script = new vm.Script(txt);
script.runInThisContext({filename: 'count.vm'});

console.log(count1);
console.log(count2);

console.log('------------');
global.count3 = 100;
var count4 = 100;

var txt2 = `count3++;
            count4++;
            console.log(count3);
            console.log(count4);`

var script2 = new vm.Script(txt2, {filename: 'count.vm'});

try {
    script2.runInThisContext();
} catch (err) {
    console.log(err.stack);
}

console.log('------------');
var fs = require('fs');

global.count5 = 100;
var count6 = 100;

var script = new vm.Script(fs.readFileSync('script.js', 'utf8'));
script.runInThisContext({filename:'count.vm'});

console.log(count5);
console.log(count6);

console.log('------------');
var util = require('util');

var sandbox1 = {
    count1:1
};

vm.createContext(sandbox1);
if (vm.isContext(sandbox1)) {
    console.log('contextualized...');
}

vm.runInContext('count1++; counter=true;', sandbox1, {filename: 'context.vm'});

console.log(util.inspect(sandbox1));
