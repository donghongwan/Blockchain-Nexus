// routes/loanRoutes.js
const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// Request a loan
router.post('/', loanController.requestLoan);

// Get all loans for a user
router.get('/:userId', loanController.getUser Loans);

module.exports = router;
