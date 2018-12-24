let mysql = require('mysql'),
    crypto = require('crypto');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hsia0521'
});

connection.connect();
connection.query('USE nodedatabases');

let username = process.argv[2];
let password = process.argv[3];

let salt = Math.round((Date.now() * Math.random())) + '';
let hashpassword = crypto.createHash('sha512')
    .update(salt + password, 'utf8')
    .digest('hex');

// create user record
connection.query('INSERT INTO user ' +
                    'SET username = ? , passwordhash = ?, salt = ?', [username, hashpassword, salt],
    (err, result) => {
    if (err) {
        console.error(err);
    }
    connection.end();
});

