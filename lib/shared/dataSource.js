const config = require('../../config.json');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node-user-service-master')
    .then(() => console.log('Application is Connected to MongoDB Successfully.'))
    .catch((err) => console.error(err));

mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Product: require('../products/product.model'),
    Supplier: require('../suppliers/supplier.model')
};
