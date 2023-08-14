const { Pool } = require('pg');

const credentials = {
	user: 'justinpennerthkoeln',
	host: 'ep-snowy-brook-20893320.eu-central-1.aws.neon.tech',
	database: 'neondb',
	password: '6eKbonMgAjE0',
	port: 5432,
    ssl: true
};

// Connect with a connection pool.
const pool = new Pool(credentials);

exports.check = async function(username, password) {
    try {
        const query = `SELECT CASE WHEN EXISTS (SELECT * FROM users WHERE username = $1 AND password = $2) THEN 'true' ELSE 'false' END`;
		const values = [username, password];
		return await pool.query(query, values);
    } catch (err) {
        console.log(err);
        return false;
    }
}

exports.updateLastSeen = async function(date) {
    try {
        const query = 'UPDATE users SET last_seen = $1';
		const values = [date];
		return await pool.query(query, values);
    } catch (err) {
        console.log(err);
        return false;
    }
}

exports.getLastSeen = async function() {
    try {
        const query = 'SELECT last_seen FROM users';
		const values = [];
        const response = await pool.query(query, values);
		return await response.rows[0].last_seen;
    } catch (err) {
        console.log(err);
        return false;
    }
}