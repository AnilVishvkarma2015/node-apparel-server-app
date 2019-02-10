const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    feedbackUser: { type: String },
    feedbackMessage: { type: String },
    feedbackStatus: { type: String, default: "Pending" },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Feedback', schema);
