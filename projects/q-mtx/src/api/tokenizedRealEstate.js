// src/api/tokenizedRealEstate.js
import express from 'express';

const router = express.Router();

// Mock tokenized real estate data
let realEstateTokens = [];

// Route to get all tokenized real estate
router.get('/', (req, res) => {
    res.json(realEstateTokens);
});

// Route to tokenize a new real estate property
router.post('/', (req, res) => {
    const { propertyName, value } = req.body;
    const newRealEstateToken = { id: realEstateTokens.length + 1, propertyName, value };
    realEstateTokens.push(newRealEstateToken);
    res.status(201).json(newRealEstateToken);
});

export default router;
