const express = require('express');
const router = express.Router();
const supplierService = require('./supplier.service');
const cache = require('../shared/cache');

function create(req, res, next) {
    supplierService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    supplierService.getAll()
        .then(suppliers => res.json(suppliers))
        .catch(err => next(err));
}

function getById(req, res, next) {
    supplierService.getById(req.params.id)
        .then(supplier => supplier ? res.json(supplier) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    supplierService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    supplierService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

// routes
router.post('/create', create);
router.get('/', cache.applyCache(300), getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;