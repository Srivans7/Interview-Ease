const mysql = require('mysql');

function connectToDatabase() {
    const conDB = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    });

    conDB.connect(function(err) {
        if (err) throw err;
        console.log("MySQL Connected!");
    });
    return conDB;
}

module.exports = connectToDatabase;
