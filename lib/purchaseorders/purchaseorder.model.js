const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    orderNumber: { type: String, required: true },
    orderStatus: { type: String, required: true },
    supplierName: { type: String, required: true },
    quantityOrdered: { type: Number, required: true },
    deliveryDate: { type: Date, default: Date.now },
    billingAmount: { type: Number, required: true },
    poItems: [{
        orderNumber: { type: String, required: true },
        orderStatus: { type: String, required: true },
        productCategory: { type: String, required: true },
        productBrand: { type: String, required: true },
        productName: { type: String, required: true },
        supplierName: { type: String, required: true },
        orderQuantity: { type: Number, required: true },
        deliveryDate: { type: Date, default: Date.now },
        productPrice: { type: Number, required: true },
        productsOrderPrice: { type: Number, required: true }
    }],
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('PurchaseOrder', schema);
