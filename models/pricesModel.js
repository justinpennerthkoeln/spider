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

exports.getAllPrices = async function () {
    try {
        const query ='SELECT * FROM prices';
        const values = [];
        return await pool.query(query, values);
    } catch (err) {
        console.log(err);
        return null;
    }
};

exports.addPrice = async function (url, tag1, tag2, tag3, tag4, tag5) {
    try {
        const query =`INSERT INTO prices (url, tag1, tag2, tag3, tag4, tag5) VALUES ($1, $2, $3, $4, $5, $6)`;
		const values = [url, tag1, tag2, tag3, tag4, tag5];
		await pool.query(query, values);
        return true;
    } catch (err) {
        console.log(err);
        return null;
    }
};