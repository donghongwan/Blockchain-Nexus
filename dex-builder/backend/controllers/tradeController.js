// backend/controllers/tradeController.js
const Trade = require('../models/Trade');

const createTrade = async (req, res) => {
    const { tokenIn, tokenOut, amountIn, userId } = req.body;
    try {
        const newTrade = new Trade({ tokenIn, tokenOut, amountIn, userId });
        await newTrade.save();
        res.status(201).json({ message: 'Trade created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating trade' });
    }
};

const getTrades = async (req, res) => {
    try {
        const trades = await Trade.find();
        res.status(200).json(trades);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching trades' });
    }
};

module.exports = { createTrade, getTrades };
