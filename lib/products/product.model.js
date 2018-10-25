const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    productName: { type: String, required: true },
    productBrand: { type: String, required: true },
    productCategory: { type: String, required: true },
    productBarcode: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: {type: Number, required: true, default: 0},
    createdDate: { type: Date, default: Date.now }
})

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', schema);
