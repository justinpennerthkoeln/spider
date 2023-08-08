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

exports.getAllImages = async function () {
    try {
        const query ='SELECT * FROM images';
		const values = [];
		return await pool.query(query, values);
    } catch (err) {
        console.log(err);
        return null;
    }
};

exports.getImage = async function (id) {
    try {
        const query ='SELECT * FROM images WHERE id = $1';
		const values = [id];
		return await pool.query(query, values);
    } catch (err) {
        console.log(err);
        return null;
    }
};

exports.addImage = async function (caption, link) {
    try {
        const query ='INSERT INTO images (caption, url) VALUES ($1, $2)';
        const values = [caption, link];
        await pool.query(query, values);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

exports.deleteImage = async function (id) {
    try {
        const query ='DELETE FROM images WHERE id = $1';
        const values = [id];
        await pool.query(query, values);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};