const log = require('log4js').getLogger('application');
const db = require('../shared/dataSource');
const Stock = db.Stock;

function getAll() {
    return Stock.find();
}

function getById(id) {
    return Stock.findById(id);
}

function getByBarcode(barcode) {
    return Stock.find({ productBarcode: barcode });
}

function create(stockParams) {
    const stock = new Stock(stockParams);
    return stock.save();
}

function update(id, stockParam) {
    return Stock.findByIdAndUpdate(id, { $set: stockParam }, function (err, result) {
        if (err) {
            log.error(err);
        }
        log.info('Updating Stocks record:', result);
    });
}

function _delete(id) {
    return Stock.findByIdAndRemove(id);
}


module.exports = {
    getAll,
    getById,
    getByBarcode,
    create,
    update,
    delete: _delete
};
