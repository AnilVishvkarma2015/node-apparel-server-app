const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('config');
const log = require('log4js').getLogger('application');

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: config.get('emailUser'),
        pass: config.get('emailPass')
    }
}));

function sendMail(mailOptions) {
    mailOptions.from = config.get('emailUser');
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                log.error(`Email Service - Error occured to send email: ${error}`);
                reject({
                    payload: error,
                    message: 'Email sending failed'
                })
            } else {
                log.info(`Email Service - Email Sent Successfully`);
                log.trace(`Email Service - Email Sent Success Response: ${info}`);
                resolve({
                    payload: info,
                    message: 'Email Sent Successfully'
                })
            }
        });

        transporter.close();
    })
}

module.exports = { sendMail };
