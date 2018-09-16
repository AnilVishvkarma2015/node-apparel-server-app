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
    return PurchaseOrder.findOneAndUpdate(id, { $set: poParams }, function (err, result) {
        if (err) console.log(err);
        console.log("Result ---", result);
    })
}

function _delete(id) {
    return PurchaseOrder.findOneAndDelete(id);
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
}
