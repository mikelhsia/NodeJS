var BookClass = require('./book.js');
var book = new BookClass();

book.on('rated', () => {
    console.log('Rated with ' + book.getPoints());
});

book.rate(10);
