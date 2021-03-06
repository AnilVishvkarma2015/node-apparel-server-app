const log = require('log4js').getLogger('application');
const db = require('../shared/dataSource');
const PurchaseOrder = db.PurchaseOrder;

function create(poParams) {
    const purchaseOrder = new PurchaseOrder(poParams);
    return purchaseOrder.save();
}

function getAll() {
    return PurchaseOrder.find();
}

function getById(id) {
    return PurchaseOrder.findById(id);
}

function update(id, poParams) {
    return PurchaseOrder.findByIdAndUpdate(id, { $set: poParams }, function (err, result) {
        if (err) log.error(err);
        log.info('Updating purchase order record:', result);
    })
}

function _delete(id) {
    return PurchaseOrder.findByIdAndDelete(id);
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
}
