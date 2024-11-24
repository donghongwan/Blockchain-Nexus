// src/api/dynamicNFT.js
import express from 'express';

const router = express.Router();

// Mock dynamic NFTs data
let dynamicNFTs = [];

// Route to get all dynamic NFTs
router.get('/', (req, res) => {
    res.json(dynamicNFTs);
});

// Route to create a new dynamic NFT
router.post('/', (req, res) => {
    const { name, attributes } = req.body;
    const newDynamicNFT = { id: dynamicNFTs.length + 1, name, attributes };
    dynamicNFTs.push(newDynamicNFT);
    res.status(201).json(newDynamicNFT);
});

export default router;
