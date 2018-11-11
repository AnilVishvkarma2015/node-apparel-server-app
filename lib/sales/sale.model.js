const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    billNumber: { type: String, required: true },
    billDate: { type: String, required: true },
    customerPhone: { type: String, required: true },
    quantitySold: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    discount: { type: Number, required: true },
    netAmount: { type: Number, required: true },
    billingItems: [{
        productCategory: { type: String, required: true },
        productBrand: { type: String, required: true },
        productName: { type: String, required: true },
        productBarcode: { type: String, required: true },
        quantity: { type: Number, required: true },
        sellingPrice: { type: Number, required: true },
        totalAmount: { type: Number, required: true }
    }],
})

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Sale', schema);
