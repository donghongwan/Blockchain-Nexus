// src/api/insurance.js
import express from 'express';

const router = express.Router();

// Mock insurance fund status
let insuranceFund = {
    totalFund: 1000000, // Total amount in the fund
    claims: 0,          // Total claims made
    available: 1000000  // Amount available for claims
};

// Route to get insurance fund status
router.get('/', (req, res) => {
    res.json(insuranceFund);
});

// Route to file a claim
router.post('/claim', (req, res) => {
    const { amount } = req.body;
    if (amount > insuranceFund.available) {
        return res.status(400).json({ error: 'Insufficient funds for claim' });
    }
    insuranceFund.claims += amount;
    insuranceFund.available -= amount;
    res.json({ message: 'Claim approved', amount });
});

export default router;
