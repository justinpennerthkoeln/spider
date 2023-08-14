const express = require('express');
const app = express();
const path = require('path');
const defaultConfig = require('../config/default.json');
const abtMeModel = require('../models/abtMeModel.js');
const pricesModel = require('../models/pricesModel.js');
const bannerModel = require('../models/bannerModel.js');
const userModel = require('../models/userModel.js');

exports.login = async function (req, res) {
    banner = await bannerModel.getBanner();
    lastSeen = await userModel.getLastSeen();
    if(req.session.user != undefined) {
        res.status(200).redirect('/index?success=login');
    } else {
        res.render('user/login.ejs', {banner: await banner.rows[0].url, lastSeen: lastSeen});
    }
}

exports.loginEval = async function (req, res) {
    var isRight = await userModel.check(req.body.username, req.body.password);
    if(isRight) {
        req.session.user = {username: req.body.username, password: req.body.password};
        userModel.updateLastSeen("last seen: " + new Date().getDate() + "-" + (new Date().getMonth()+1) + "-" + new Date().getFullYear());
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
    try {
        if(req.session.user != undefined) {
            var abtMeText = await abtMeModel.getAbtMeText();
            var banner = await bannerModel.getBanner();
             lastSeen = await userModel.getLastSeen();
            res.render('user/settings.ejs', {banner: await banner.rows[0].url, lastSeen: lastSeen});
        } else {
            res.redirect('/login?error=not_logged_in');
        }
    } catch(err) {
        console.log(err);
        res.redirect('/login?error=something_went_wrong');
    }
};

exports.priceList = async function (req, res) {
    banner = await bannerModel.getBanner();
    prices = await pricesModel.getAllPrices();
     lastSeen = await userModel.getLastSeen();
    res.render('user/priceList.ejs', {banner: await banner.rows[0].url, prices: await prices.rows, isSpider: req.session.user != undefined, lastSeen: lastSeen});
};

exports.priceListEval = async function (req, res) {
    res.redirect("price-list");
};

exports.home = async function (req, res) {
    try {
        banner = await bannerModel.getBanner();
        var abtMeText = await abtMeModel.getAbtMeText();
         lastSeen = await userModel.getLastSeen();
        res.render('user/home.ejs', {abtMeText: await abtMeText.rows[0].abt_me_text, banner: await banner.rows[0].url, lastSeen: lastSeen});
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

exports.switchBanner = async function (req, res) {
    try {
        await bannerModel.setBanner();
        res.redirect('/settings?success=banner_switched');
    } catch (err) {
        console.log(err);
        res.redirect('/settings?error=banner_not_switched');
    }
};

exports.addPrice = async function (req, res) {
    try {
        console.log(req.body);
        await pricesModel.addPrice(req.body.url, req.body.tag1, req.body.tag2, req.body.tag3, req.body.tag4, req.body.tag5);
        res.redirect('/settings?success=price_added');
    } catch (err) {
        console.log(err);
        res.redirect('/settings?error=price_not_added');
    }
};

exports.deletePrice = async function (req, res) {
    try {
        await pricesModel.deletePrice(req.query.id);
        res.redirect('/price-list?success=price_deleted');
    } catch (err) {
        console.log(err);
        res.redirect('/price-list?error=price_not_added');
    }
};