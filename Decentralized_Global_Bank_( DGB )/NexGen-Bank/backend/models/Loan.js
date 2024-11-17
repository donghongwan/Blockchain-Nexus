// models/Loan.js
const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    amount: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    duration: { type: Number, required: true }, // in days
    status: { type: String, enum: ['pending', 'approved', 'repaid'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Loan', loanSchema);
