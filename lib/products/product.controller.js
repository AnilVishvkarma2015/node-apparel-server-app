const express = require('express');
const router = express.Router();
const mcache = require('memory-cache');
const productService = require('./product.service');
const cache = require('../shared/cache');

function create(req, res, next) {
    productService.create(req.body)
        .then(() => {
            mcache.del('products');
            res.json({});
        })
        .catch(err => next(err));
}

function getAll(req, res, next) {
    productService.getAll()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getById(req, res, next) {
    productService.getById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    productService.update(req.params.id, req.body)
        .then(() => {
            mcache.del('products');
            res.json({});
        })
        .catch(err => next(err));
}

function _delete(req, res, next) {
    productService.delete(req.params.id)
        .then(() => {
            mcache.del('products');
            res.json({});
        })
        .catch(err => next(err));
}

// routes
router.post('/create', create);
router.get('/', cache.applyCache(300, 'products'), getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;
