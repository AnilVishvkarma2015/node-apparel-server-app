const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    supplierName: { type: String, required: true },
    supplierCode: { type: String, required: true },
    supplierEmail: { type: String, required: true },
    supplierPhone: { type: String, required: true },
    supplierCountry: { type: String, required: true },
    supplierState: { type: String, required: true },
    supplierCity: { type: String, required: true },
    supplierAddress: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
})

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Supplier', schema);
