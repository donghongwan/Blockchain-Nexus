// src/api/carbonCredit.js
import express from 'express';

const router = express.Router();

// Mock carbon credits data
let carbonCredits = [];

// Route to get all carbon credits
router.get('/', (req, res) => {
    res.json(carbonCredits);
});

// Route to create a new carbon credit
router.post('/', (req, res) => {
    const { projectName, creditsIssued } = req.body;
    const newCredit = { id: carbonCredits.length + 1, projectName, creditsIssued };
    carbonCredits.push(newCredit);
    res.status(201).json(newCredit);
});

export default router;
