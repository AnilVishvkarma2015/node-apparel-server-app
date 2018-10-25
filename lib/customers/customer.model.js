const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    customerName: { type: String, required: true },
    customerEmail: { type: String },
    customerPhone: { type: String, required: true },
    customerCountry: { type: String },
    customerState: { type: String },
    customerCity: { type: String },
    createdDate: { type: Date, default: Date.now }
})

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Customer', schema);
