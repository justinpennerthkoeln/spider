const express = require('express');
const app = express();
const path = require('path');
const galery = require('../config/galery.json');
var fs = require('fs');

exports.galery = async function (req, res) {
    res.status(200).sendFile('index.html', {
        root: path.join(__dirname, '../views/galery'),
    });
};

exports.newImage = async function (req, res) {
    if(req.session.user != undefined) {
        res.status(200).sendFile('newImage.html', {
            root: path.join(__dirname, '../views/galery'),
        });
    } else {
        res.redirect('/login?error=not_logged_in');
    }
   
};

exports.newImageEval = async function (req, res) {
    galery.push({"caption": req.body.caption, "link": req.body.url});
    fs.writeFileSync('./config/galery.json', JSON.stringify(galery));
    res.status(200).sendFile('newImage.html', {
        root: path.join(__dirname, '../views/galery'),
    });
};