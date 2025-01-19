

var mysql = require('mysql2');
var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'guswoduf1@',
    database: 'afr_data_db',
    port: 3306
})

module.exports = db;