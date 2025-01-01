var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'guswoduf1@',
    database: 'opentutorials',
    port: 3306
});

connection.connect();
connection.query('select * from topic', function (error, results, fields) {
    if (error) {
        console.log(error);
    }
    console.log(results);
});
connection.end();