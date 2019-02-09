const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    feedbackUser: { type: String, required: true },
    feedbackUserEmail: { type: String },
    feedbackCategory: { type: String, required: true },
    feedbackMessage: { type: String },
    feedbackStatus: { type: String },
    createdDate: { type: Date, default: Date.now }
})

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Feedback', schema);
