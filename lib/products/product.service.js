const db = require('../shared/dataSource');
const Product = db.Product;

function getAll() {
    return Product.find();
}

function getById(id) {
    return Product.findById(id);
}

function create(productParams) {
    const product = new Product(productParams);
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
