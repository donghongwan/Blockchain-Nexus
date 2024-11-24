// src/api/dataMarketplace.js
import express from 'express';

const router = express.Router();

// Mock data marketplace transactions
let transactions = [];

// Route to get all transactions
router.get('/', (req, res) => {
    res.json(transactions);
});

// Route to create a new transaction
router.post('/', (req, res) => {
    const { dataName, buyer, seller, price } = req.body;
    const newTransaction = { id: transactions.length + 1, dataName, buyer, seller, price };
    transactions.push(newTransaction);
    res.status(201).json(newTransaction);
});

export default router;
