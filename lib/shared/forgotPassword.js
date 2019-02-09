const userService = require('../users/user.service');
const emailService = require('./emailService');
const emailTemplate = require('./emailTemplates');
const _ = require('underscore');
const uuidv1 = require('uuid/v1');
const log = require('log4js').getLogger('application');

function forgotPassword(email, origin) {
    return new Promise((resolve, reject) => {
        return userService.getByEmail(email)
            .then(user => {
                if (user && _.isArray(user)) {
                    if (_.isEmpty(user)) {
                        log.info(`Forgot Password - Email ${email.email} does not exist in system`);
                        const responseMessage = { message: `Email does not exist in system!`, code: 400 };
                        resolve(responseMessage);
                        return;
                    }

                    const resetToken = uuidv1(); // ⇨ '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
                    const userId = user[0]._id;
                    const userParams = { resetToken: resetToken };
                    return userService.update(userId, userParams)
                        .then(() => {
                            const mailoptions = {
                                to: user[0].email,
                                subject: "Forgot Password",
                                html: emailTemplate.getTemplateForForgotPassword(user[0].firstName, origin, resetToken)
                            };
                            return emailService.sendMail(mailoptions)
                                .then(emailReponse => {
                                    emailReponse.code = 200;
                                    emailReponse.message = "Email sent successfully to reset your password again."
                                    resolve(emailReponse);
                                })
                        });
                }
            }).catch(err => {
                log.error(`Forgot Password - Error occured: ${err} `);
                reject(err);
            })
    })
}

module.exports = { forgotPassword };