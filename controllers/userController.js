const express = require('express');
const app = express();
const path = require('path');
const defaultConfig = require('../config/default.json');
const abtMeModel = require('../models/abtMeModel.js');
const bannerModel = require('../models/bannerModel.js');

exports.login = async function (req, res) {
    banner = await bannerModel.getBanner("open");
    console.log(banner.rows[0].url);
    if(req.session.user != undefined) {
        res.render('galery/index.ejs', {banner: await banner.rows[0].url})
        res.status(200).redirect('/index?success=login');
    } else {
        res.render('user/login.ejs', {banner: await banner.rows[0].url});
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
    banner = await bannerModel.getBanner("open");
    try {
        if(req.session.user != undefined) {
            var abtMeText = await abtMeModel.getAbtMeText();
            res.render('user/settings.ejs', {banner: banner.rows[0]});
        } else {
            res.redirect('/login?error=not_logged_in');
        }
    } catch(err) {
        console.log(err);
        res.redirect('/login?error=something_went_wrong');
    }
};

exports.priceList = async function (req, res) {
    banner = await bannerModel.getBanner("open");
    res.render('user/priceList.ejs', {banner: banner.rows[0]});
};

exports.priceListEval = async function (req, res) {
    res.redirect("price-list");
};

exports.home = async function (req, res) {
    try {
        banner = await bannerModel.getBanner("open");
        var abtMeText = await abtMeModel.getAbtMeText();
        res.render('user/home.ejs', {abtMeText: await abtMeText.rows[0].abt_me_text, banner: banner.rows[0]});
    } catch(err) {
        console.log(err);
        res.redirect('/galery');
    }
};

exports.updateText = async function (req, res) {
    try {
        await abtMeModel.postAbtMeText(req.body.text);
        res.redirect('/settings?success=abt_me_text_updated');
    } catch (err) {
        console.log(err);
        res.redirect('/settings?error=abt_me_text_not_updated');
    }
};