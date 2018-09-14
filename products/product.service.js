const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../shared/dataSource');
const Product = db.Product;

function getAll() {
    console.log("--- Service Request ---");
    return Product.find();
}

function getById(id) {
    return Product.findById(id);
}

function create(productParams) {
    // validate
    console.log("Create Product -----", productParams);
    /* if (Product.findOne({ productBarcode: productParams.productBarcode })) {
        throw 'Product  Barcode "' + productParams.productBarcode + '" is already created.';
    } */

    const product = new Product(productParams);

    // save user
    return product.save();
}

function update(id, productParam) {
    return Product.findByIdAndUpdate(id, { $set: productParam }, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log("RESULT: " + result);
    });
}

function _delete(id) {
    return Product.findByIdAndRemove(id);
}


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
