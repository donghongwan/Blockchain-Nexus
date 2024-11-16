const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    paymentId: { type: String, required: true },
    transactionHash: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
