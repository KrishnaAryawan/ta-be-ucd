const mysql = require("mysql2");

const database = mysql.createConnection({
	host: process.env.DBHOST,
	user: process.env.DBUSERNAME,
	password: process.env.DBPASSWORD,
	database: process.env.DBNAME,
});

database.connect(function (error) {
	if (error) {
		throw error;
	}
});

module.exports = database;
