const express = require('express');
const router = express.Router();
const mcache = require('memory-cache');
const saleService = require('./sale.service');
const cache = require('../shared/cache');

function create(req, res, next) {
    saleService.create(req.body)
        .then(() => {
            mcache.del('sales');
            res.json({});
        })
        .catch(err => next(err));
}

function getAll(req, res, next) {
    saleService.getAll()
        .then(sales => res.json(sales))
        .catch(err => next(err));
}

function getById(req, res, next) {
    saleService.getById(req.params.id)
        .then(sale => sale ? res.json(sale) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    saleService.update(req.params.id, req.body)
        .then(() => {
            mcache.del('sales');
            res.json({});
        })
        .catch(err => next(err));
}

function _delete(req, res, next) {
    saleService.delete(req.params.id)
        .then(() => {
            mcache.del('sales');
            res.json({});
        })
        .catch(err => next(err));
}

// routes
router.post('/create', create);
router.get('/', cache.applyCache(300, 'sales'), getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;