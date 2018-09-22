const config = require('../../config.json');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB, { reconnectTries: Number.MAX_VALUE,
reconnectInterval: 1000})
    .then(() => console.log('Application is Connected to MongoDB Successfully.'))
    .catch((err) => console.error(err));

mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Product: require('../products/product.model'),
    Supplier: require('../suppliers/supplier.model'),
    PurchaseOrder: require('../purchaseorders/purchaseorder.model')
};
