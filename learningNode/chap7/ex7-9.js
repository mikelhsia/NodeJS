let mysql = require('mysql'),
    crypto = require('crypto');

let connection = mysql.createConnection({
    user: 'root',
    password: 'hsia0521'
});

connection.query('USE nodedatabases');

let username = process.argv[2];
let password = process.argv[3];

connection.query('SELECT passwordhash, salt FROM user WHERE username = ?', [username],
    (err, result, fields) => {
    if (err) {
        return console.error(err);
    }

    let newhash = crypto.createHash('sha512').update(result[0].salt + password, 'utf8').digest('hex');

    if (result[0].passwordhash === newhash) {
        console.log('OK, you\'re cool');
    } else {
        console.log('Your password is wrong. Try again.');
    }

    connection.end();
});