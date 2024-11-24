// src/api/decentralizedExchange.js
import express from 'express';

const router = express.Router();

// Mock exchange data
let trades = [];

// Route to get all trades
router.get('/', (req, res) => {
    res.json(trades);
});

// Route to execute a trade
router.post('/trade', (req, res) => {
    const { fromToken, toToken, amount } = req.body;
    const newTrade = { id: trades.length + 1, fromToken, toToken, amount };
    trades.push(newTrade);
    res.status(201).json(newTrade);
});

export default router;
