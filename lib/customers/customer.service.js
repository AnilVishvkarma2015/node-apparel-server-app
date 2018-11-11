const log = require('log4js').getLogger('application');
const db = require('../shared/dataSource');
const Customer = db.Customer;

function getAll() {
    return Customer.find();
}

function getById(id) {
    return Customer.findById(id);
}

function getByPhone(phone) {
    return Customer.find({ customerPhone: phone });
}

function create(customerParams) {
    const customer = new Customer(customerParams);
    return customer.save();
}

function update(id, customerParam) {
    return Customer.findByIdAndUpdate(id, { $set: customerParam }, function (err, result) {
        if (err) {
            log.error(err);
        }
        log.info('Updating Customer record:', result);
    });
}

function _delete(id) {
    return Customer.findByIdAndRemove(id);
}


module.exports = {
    getAll,
    getById,
    getByPhone,
    create,
    update,
    delete: _delete
};
