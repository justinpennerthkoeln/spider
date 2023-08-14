const bannerModel = require('../models/bannerModel.js');
const userModel = require('../models/userModel.js');

exports.payment = async function (req, res) {
    try {
        banner = await bannerModel.getBanner();
         lastSeen = await userModel.getLastSeen();
        res.render('payment/payment.ejs', {banner: await banner.rows[0].url, lastSeen: lastSeen});
    } catch(err) {
        console.log(err);
        res.redirect('/galery?error=galery_not_loaded');
    }
};
