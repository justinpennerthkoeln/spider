const nodemailer = require('nodemailer');
const config = require('../config/default.json');

let sendMail = function(from, text){
    let transporter = nodemailer.createTransport(config.transportConfig);
    config.mailConfig.from = from + "<spider - galery>";
    config.mailConfig.to = config.email.to;
    config.mailConfig.text = text;
    transporter.sendMail(config.mailConfig, (error, info) => {});
};

module.exports = {sendMail}