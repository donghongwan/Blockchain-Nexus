// src/api/liquidityPool.js
import express from 'express';

const router = express.Router();

// Mock liquidity pool data
let liquidityPool = {
    totalLiquidity: 1000000,
    tokens: []
};

// Route to get liquidity pool status
router.get('/', (req, res) => {
    res.json(liquidityPool);
});

// Route to add liquidity
router.post('/add', (req, res) => {
    const { amount, token } = req.body;
    liquidityPool.totalLiquidity += amount;
    liquidityPool.tokens.push({ token, amount });
    res.json({ message: 'Liquidity added', liquidityPool });
});

export default router;
