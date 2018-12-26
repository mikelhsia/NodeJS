let fs = require('fs');

fs.readFile('./apples.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        let adjData = data.replace(/apple/g, 'orange');
        fs.writeFile('./oranges.txt', adjData, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
});