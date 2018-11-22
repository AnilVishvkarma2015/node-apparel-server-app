const userService = require('../users/user.service');
const emailService = require('./emailService');
const emailTemplate = require('./emailTemplates');
const log = require('log4js').getLogger('application');

function resetPassword(resetPassPayload) {
    return new Promise((resolve, reject) => {
        return userService.getByResetToken(resetPassPayload.resetToken)
            .then(user => {
                if (user === null || user === undefined) {
                    log.info(`Reset Password - Token ${resetPassPayload.resetToken} does not exist or expired`);
                    const responseMessage = { message: `Reset Token is not exist or expired.`, code: 404 };
                    resolve(responseMessage);
                    return;
                }

                return user;
            })
            .then(user => {
                const userId = user._id;
                const updateParams = {
                    password: resetPassPayload.password,
                    resetPassword: undefined
                };

                return userService.update(userId, updateParams)
                    .then(() => {
                        const mailoptions = {
                            to: user.email,
                            subject: "Password Reset Successfully",
                            html: emailTemplate.getTemplateForResetPassword(user.firstName)
                        };
                        return emailService.sendMail(mailoptions)
                            .then(emailReponse => {
                                emailReponse.code = 200;
                                emailReponse.message = `Password reset successfully. Please login with new password.`;
                                resolve(emailReponse);
                            })
                    })
            })
            .catch(err => {
                log.error(`Reset Password - Error occured: ${err}`);
                reject(err);
            });
    });
}

module.exports = { resetPassword };