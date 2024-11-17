// controllers/loanController.js
const Loan = require('../models/Loan');

exports.requestLoan = async (req, res) => {
    const { userId, amount, interestRate, duration } = req.body;
    const newLoan = new Loan({ userId, amount, interestRate, duration });

    try {
        await newLoan.save();
        res.status(201).json({ message: 'Loan requested successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Loan request failed' });
    }
};

exports.getUser Loans = async (req, res) => {
    const userId = req.params.userId;
    try {
        const loans = await Loan.find({ userId });
        res.json(loans);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching loans' });
    }
};
