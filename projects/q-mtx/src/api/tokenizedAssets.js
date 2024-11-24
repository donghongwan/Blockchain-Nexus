// src/api/tokenizedAssets.js
import express from 'express';

const router = express.Router();

// Mock tokenized assets data
let tokenizedAssets = [];

// Route to get all tokenized assets
router.get('/', (req, res) => {
    res.json(tokenizedAssets);
});

// Route to tokenize a new asset
router.post('/', (req, res) => {
    const { assetName, value } = req.body;
    const newAsset = { id: tokenizedAssets.length + 1, assetName, value };
    tokenizedAssets.push(newAsset);
    res.status(201).json(newAsset);
});

export default router;
