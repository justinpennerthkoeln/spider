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

exports.getBanner = async function (stateName) {
    try {
        const query ='SELECT * FROM banner WHERE state_name = $1';
		const values = [stateName];
		return await pool.query(query, values);
    } catch (err) {
        console.log(err);
        return null;
    }
};

exports.setBanner = async function () {
    
};