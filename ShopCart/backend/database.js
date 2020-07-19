const mysql = require('mysql');

const connection = mysql.createConnection({
    host : "localhost",
    port : "3360",
    user : "root",
    password : "123456",
    database : "grocery"
})

module.exports = connection;