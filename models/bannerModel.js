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

exports.getBanner = async function () {
    try {
        const query =`SELECT * FROM banner WHERE state = 'true'`;
		const values = [];
		return await pool.query(query, values);
    } catch (err) {
        console.log(err);
        return null;
    }
};

exports.setBanner = async function () {
    try {
        var banner = await this.getBanner();
        if(banner.rows[0].id == 1) {
            pool.query('UPDATE banner SET state = false WHERE id = 1');
            pool.query('UPDATE banner SET state = true WHERE id = 2');
        } else {
            pool.query('UPDATE banner SET state = false WHERE id = 2');
            pool.query('UPDATE banner SET state = true WHERE id = 1');
        }
    } catch (err) {
        console.log(err);
        return null;
    }
};