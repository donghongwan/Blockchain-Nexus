// src/api/price.js
import express from 'express';

const router = express.Router();
const FIXED_PRICE = 314.159; // Fixed price for Pi Coin

// Route to get Pi Coin price
router.get('/', (req, res) => {
    res.json({ price: FIXED_PRICE, source: 'fixed' });
});

export default router;
