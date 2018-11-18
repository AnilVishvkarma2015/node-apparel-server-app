const express = require('express');
const router = express.Router();
const emailService = require('./emailService')
const forgotPassService = require('./forgotPassword');
const resetPassService = require('./resetPassword');

function semdMail(req, res, next) {
    emailService.sendMail(req.body)
        .then(result => {
            res.json(result);
        })
        .catch(err => next(err));
}

function forgotPassword(req, res, next) {
    forgotPassService.forgotPassword(req.body, req.headers.origin)
        .then(result => {
            res.json(result);
        })
        .catch(err => next(err));
}

function resetPassword(req, res, next) {
    resetPassService.resetPassword(req.body)
        .then(result => {
            res.json(result);
        })
        .catch(err => next(err));
}
router.post('/email', semdMail);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);

module.exports = router;
