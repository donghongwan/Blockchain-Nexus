// src/api/socialImpactToken.js
import express from 'express';

const router = express.Router();

// Mock social impact tokens data
let socialImpactTokens = [];

// Route to get all social impact tokens
router.get('/', (req, res) => {
    res.json(socialImpactTokens);
});

// Route to create a new social impact token
router.post('/', (req, res) => {
    const { tokenName, impactDescription } = req.body;
    const newToken = { id: socialImpactTokens.length + 1, tokenName, impactDescription };
    socialImpactTokens.push(newToken);
    res.status(201).json(newToken);
});

export default router;
