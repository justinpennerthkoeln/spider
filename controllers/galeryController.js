const express = require('express');
const app = express();
const path = require('path');

exports.galery = async function (req, res) {
    res.status(200).sendFile('index.html', {
        root: path.join(__dirname, '../views'),
    });
};