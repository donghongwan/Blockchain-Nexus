// controllers/transactionController.js
const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
    const { userId, amount, type } = req.body;
    const newTransaction = new Transaction({ userId, amount, type });

    try {
        await newTransaction.save();
        res.status(201).json({ message: 'Transaction created successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Transaction creation failed' });
    }
};

exports.getUser Transactions = async (req, res) => {
    const userId = req.params.userId;
    try {
        const transactions = await Transaction.find({ userId });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions' });
    }
};
