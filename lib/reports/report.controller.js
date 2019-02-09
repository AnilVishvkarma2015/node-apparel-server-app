const express = require('express');
const router = express.Router();
const reportService = require('./report.service');

function create(req, res, next) {
    reportService.create(req.body)
        .then(emailReponse => {
            emailReponse.code = 200;
            emailReponse.message = "User Subscribed Successfully."
            res.json(emailReponse);
        })
        .catch(err => next(err));
}

// routes
router.post('/create', create);

module.exports = router;
