const express = require('express');
const router = express.Router();
const mcache = require('memory-cache');
const userService = require('./user.service');
const cache = require('../shared/cache');

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByEmail(req, res, next) {
    userService.getByEmail(req.body.email)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => {
            mcache.del('users');
            res.json({});
        })
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => {
            mcache.del('users');
            res.json({});
        })
        .catch(err => next(err));
}

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', cache.applyCache(300, 'users'), getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.post('/getByEmail', getByEmail);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;