const express = require('express');
const router = express.Router();
const mcache = require('memory-cache');
const stockService = require('./stock.service');
const cache = require('../shared/cache');

function create(req, res, next) {
    stockService.create(req.body)
        .then(() => {
            mcache.del('stocks');
            res.json({});
        })
        .catch(err => next(err));
}

function getAll(req, res, next) {
    stockService.getAll()
        .then(stocks => {
            res.json(stocks)
        })
        .catch(err => next(err));
}

function getById(req, res, next) {
    stockService.getById(req.params.id)
        .then(stock => stock ? res.json(stock) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByBarcode(req, res, next) {
    stockService.getByBarcode(req.params.barcode)
        .then(stock => stock ? res.json(stock) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    stockService.update(req.params.id, req.body)
        .then(() => {
            mcache.del('stocks');
            res.json({});
        })
        .catch(err => next(err));
}

function _delete(req, res, next) {
    stockService.delete(req.params.id)
        .then(() => {
            mcache.del('stocks');
            res.json({});
        })
        .catch(err => next(err));
}

// routes
router.post('/create', create);
router.get('/', cache.applyCache(300, 'stocks'), getAll);
router.get('/:id', getById);
router.get('/getByBarcode/:barcode', getByBarcode);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;