const mongoose = require('mongoose');
const config = require('config');

DB_URL = config.get('MONGODB_URL');

mongoose.connect(DB_URL, {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true
})
    .then(() => console.log('Application connected to MongoDB Successfully.'))
    .catch((err) => console.error(err));

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Product: require('../products/product.model'),
    Supplier: require('../suppliers/supplier.model'),
    PurchaseOrder: require('../purchaseorders/purchaseorder.model')
};
