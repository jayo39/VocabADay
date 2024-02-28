const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    database: "vaddb",
    user: "vaduser",
    password: "1234",
    port: 3306,
    host: 'localhost'
});

module.exports = pool;