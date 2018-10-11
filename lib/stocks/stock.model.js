const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    productName: { type: String, required: true },
    productBrand: { type: String, required: true },
    productCategory: { type: String, required: true },
    productBarcode: { type: String, required: true },
    stockQuantity: { type: Number, required: true },
    stockStatus: { type: String, default: "Inactive" },
    sellingPrice: { type: Number, required: true },
    purchasedPrice: { type: Number, required: true },
    marginPercent: { type: Number, default: 5 },
    createdDate: { type: Date, default: Date.now }
})

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Stock', schema);
