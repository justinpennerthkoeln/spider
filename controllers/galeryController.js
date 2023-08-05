const express = require('express');
const app = express();
const path = require('path');
const galery = require('../config/galery.json');
var mailer = require('../javascript/mailer.js');
var imageModel = require('../models/imageModel.js');
var fs = require('fs');
const e = require('express');

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
    try {
        console.log(req.body)
        imageModel.addImage(req.body.caption, req.body.url);
        res.redirect('/new-image?success=image_added');
    } catch (err) {
        console.log(err);
        res.redirect('/new-image?error=image_not_added');    
    }
};

exports.contact = async function (req, res) {
    try {
        res.status(200).sendFile('contact.html', {
            root: path.join(__dirname, '../views/user'),
        });
    } catch (err) {
        console.log(err);
        res.redirect('/galery?error=contact_not_loaded');
    }
};

exports.contactEval = async function (req, res) {
    try {
        mailer.sendMail(req.body.email, req.body.text);
        res.redirect('/contact?success=email_sent');
    } catch {
        console.log(err);
        res.redirect('/contact?error=contact_not_sent');
    }
};


exports.galeryDetail = async function (req, res) {
    try {
        res.status(200).sendFile('detail.html', {
            root: path.join(__dirname, '../views/galery'),
        });
    } catch (err) {
        console.log(err);
        res.redirect('/galery?error=galery_not_loaded');
    }
};