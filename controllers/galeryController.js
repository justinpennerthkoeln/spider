const path = require('path');
var imageModel = require('../models/imageModel.js');
const bannerModel = require('../models/bannerModel.js');
const userModel = require('../models/userModel.js');

exports.galery = async function (req, res) {
    try {
        images = await imageModel.getAllImages();
        banner = await bannerModel.getBanner();
         lastSeen = await userModel.getLastSeen();
        res.render('galery/index.ejs', {images: await images.rows, isSpider: req.session.user != undefined, banner: await banner.rows[0].url, lastSeen: lastSeen});
    } catch(err) {
        console.log(err);
        res.redirect('/galery?error=galery_not_loaded');
    }
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
        res.redirect('/settings?success=image_added');
    } catch (err) {
        console.log(err);
        res.redirect('/settings?error=image_not_added');    
    }
};

exports.galeryDetail = async function (req, res) {
    try {
        var image = await imageModel.getImage(req.params.id);
        banner = await bannerModel.getBanner();
         lastSeen = await userModel.getLastSeen();
        res.render('galery/detail.ejs', {image: await image.rows[0], banner: await banner.rows[0].url, lastSeen: lastSeen});
    } catch (err) {
        console.log(err);
        res.redirect('/galery?error=galery_not_loaded');
    }
};

exports.deleteImage = async function (req, res) {
    try {
        var imageId = req.query.id;
        await imageModel.deleteImage(imageId);
        res.redirect('/galery?success=image_deleted');
    } catch (err) {
        console.log(err);
        res.redirect('/galery?error=galery_not_loaded');
    }
};