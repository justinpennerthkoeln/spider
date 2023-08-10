const express = require('express');
const app = express();
const path = require('path');
var imageModel = require('../models/imageModel.js');
var fs = require('fs');
const bannerModel = require('../models/bannerModel.js');

exports.payment = async function (req, res) {
    try {
        banner = await bannerModel.getBanner();
        res.render('payment/payment.ejs', {banner: await banner.rows[0].url});
    } catch(err) {
        console.log(err);
        res.redirect('/galery?error=galery_not_loaded');
    }
};
