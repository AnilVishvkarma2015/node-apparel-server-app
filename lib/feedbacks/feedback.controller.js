const express = require('express');
const router = express.Router();
const feedbackService = require('./feedback.service');

function create(req, res, next) {
    feedbackService.create(req.body)
        .then(feedbackResponse => {
            res.json(feedbackResponse);
        })
        .catch(err => next(err));
}

function getFeedbacks(req, res, next) {
    feedbackService.getFeedbacks()
        .then(feedbacks => res.json(feedbacks))
        .catch(err => next(err));
}

function getById(req, res, next) {
    feedbackService.getById(req.params.id)
        .then(feedback => feedback ? res.json(feedback) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    feedbackService.update(req.params.id, req.body)
        .then(() => {
            res.json({});
        })
        .catch(err => next(err));
}

// routes
router.post('/create', create);
router.get('/', getFeedbacks);
router.get('/:id', getById);
router.put('/:id', update);

module.exports = router;