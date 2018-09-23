const log = require('log4js').getLogger('application');
const db = require('../shared/dataSource');
const Supplier = db.Supplier;

function getAll() {
    return Supplier.find();
}

function getById(id) {
    return Supplier.findById(id);
}

function create(supplierParams) {
    const supplier = new Supplier(supplierParams);
    return supplier.save();
}

function update(id, supplierParam) {
    return Supplier.findByIdAndUpdate(id, { $set: supplierParam }, function (err, result) {
        if (err) {
            log.error(err);
        }
        log.info('Updating supplier record:', result);
    });
}

function _delete(id) {
    return Supplier.findByIdAndRemove(id);
}


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
