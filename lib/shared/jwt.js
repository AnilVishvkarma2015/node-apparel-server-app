const expressJwt = require('express-jwt');
const config = require('config');
const userService = require('../users/user.service');

function jwt() {
    const secret = config.get('authenticationSecret');
    const tokenTimeout = config.get('tokenExpireInTime');
    return expressJwt({ secret, isRevoked, expiresIn: tokenTimeout }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/users/getByEmail',
            '/utility/email',
            '/utility/forgotpassword',
            '/utility/resetpassword'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    done();
};

module.exports = jwt;