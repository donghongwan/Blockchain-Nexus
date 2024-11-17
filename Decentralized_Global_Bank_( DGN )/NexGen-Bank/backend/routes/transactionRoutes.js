// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Create a new transaction
router.post('/', transactionController.createTransaction);

// Get all transactions for a user
router.get('/:userId', transactionController.getUser Transactions);

module.exports = router;
