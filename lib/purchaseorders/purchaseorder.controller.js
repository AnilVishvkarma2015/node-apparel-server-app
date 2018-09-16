const express = require('express');
const router = express.Router();
const poService = require('./purchaseorder.service');

function create(req, res, next) {
    poService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err))
}

function getAll(req, res, next) {
    poService.getAll()
        .then(purchaseOrders => res.json(purchaseOrders))
        .catch(err => next(err))
}

function getById(req, res, next) {
    poService.getById(req.params.id)
        .then(purchaseOrder => purchaseOrder ? res.json(purchaseOrder) : res.sendStatus(404))
        .catch(err => next(err))
}

function update(req, res, next) {
    poService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err))
}

function _delete(req, res, next) {
    poService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err))
}

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;