const express = require('express');
const router = express.Router();
const mcache = require('memory-cache');
const customerService = require('./customer.service');
const cache = require('../shared/cache');

function create(req, res, next) {
    customerService.create(req.body)
        .then(() => {
            mcache.del('customers');
            res.json({});
        })
        .catch(err => next(err));
}

function getAll(req, res, next) {
    customerService.getAll()
        .then(customers => res.json(customers))
        .catch(err => next(err));
}

function getById(req, res, next) {
    customerService.getById(req.params.id)
        .then(customer => customer ? res.json(customer) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    customerService.update(req.params.id, req.body)
        .then(() => {
            mcache.del('customers');
            res.json({});
        })
        .catch(err => next(err));
}

function _delete(req, res, next) {
    customerService.delete(req.params.id)
        .then(() => {
            mcache.del('customers');
            res.json({});
        })
        .catch(err => next(err));
}

// routes
router.post('/create', create);
router.get('/', cache.applyCache(300, 'customers'), getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;