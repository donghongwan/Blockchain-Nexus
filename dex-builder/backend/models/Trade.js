// backend/models/Trade.js
const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    tokenIn: { type: String, required:true },
    tokenOut: { type: String, required: true },
    amountIn: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trade', tradeSchema);
