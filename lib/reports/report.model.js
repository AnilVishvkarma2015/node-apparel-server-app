const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    subscriberEmail: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
})

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Report', schema);
