const express = require('express');
const app = express();
const path = require('path');
const defaultConfig = require('../config/default.json');

exports.login = async function (req, res) {
    if(req.session.user != undefined) {
        res.status(200).redirect('/index?success=login');
    } else {
        res.status(200).sendFile('login.html', {
            root: path.join(__dirname, '../views/user'),
        });
    }
}

exports.loginEval = async function (req, res) {
    if(req.body.username == defaultConfig.user.username && req.body.password == defaultConfig.user.password) {
        req.session.user = {username: defaultConfig.user.username, password: defaultConfig.user.password};
        res.status(200).redirect('/settings?success=login');
    } else {
        res.status(400).redirect('/login?error=wrong_credentials');
    }
};

exports.logout = async function (req, res) {
    req.session.destroy();
    res.status(200).redirect('/login?success=logged_out');
};

exports.settings = async function (req, res) {
    if(req.session.user != undefined) {
        res.status(200).sendFile('settings.html', {
            root: path.join(__dirname, '../views/user'),
        });
    } else {
        res.redirect('/login?error=not_logged_in');
    }
};

exports.priceList = async function (req, res) {
    res.status(200).sendFile('priceList.html', {
        root: path.join(__dirname, '../views/user'),
    });
};

exports.priceListEval = async function (req, res) {
    res.redirect("price-list");
};