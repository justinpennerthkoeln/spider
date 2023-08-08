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

exports.getAbtMeText = async function () {
    try {
        const query ='SELECT abt_me_text FROM abt_me';
		const values = [];
		return await pool.query(query, values);
    } catch (err) {
        console.log(err);
        return null;
    }
};

exports.postAbtMeText = async function (text) {
    try {
        const query ='UPDATE abt_me SET abt_me_text = $1';
		const values = [text];
		return await pool.query(query, values);
    } catch (err) {
        console.log(err);
        return null;
    }
};
