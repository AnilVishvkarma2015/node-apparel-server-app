const log = require('log4js').getLogger('application');
const db =require('../shared/dataSource');
const Sale = db.Sale;

function getAll() {
    return Sale.find();
}

function getById(id) {
    return Sale.findById(id);
}

function create(salesParams) {
    const sale = new Sale(salesParams);
    return sale.save();
}

function update(id, salesParams) {
    return Sale.findByIdAndUpdate(id, { $set: salesParams }, function (err, result) {
        if (err) {
            log.error(err);
        }
        log.info('Updating Sales record:', result);
    });
}

function _delete(id) {
    return Sale.findByIdAndRemove(id);
}


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
