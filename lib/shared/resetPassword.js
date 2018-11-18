const userService = require('../users/user.service');
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
                const updateParams = {
                    password: resetPassPayload.password,
                    resetPassword: undefined
                };

                return userService.update(user._id, updateParams)
                    .then(() => {
                        const responseMessage = { message: `Password reset successfully. Please login with new password.`, code: 200 };
                        resolve(responseMessage);
                    });
            })
            .catch(err => {
                log.error(`Reset Password - Error occured: ${err}`);
                reject(err);
            });
    });
}

module.exports = { resetPassword };