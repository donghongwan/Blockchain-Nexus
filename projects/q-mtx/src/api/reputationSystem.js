// src/api/reputationSystem.js
import express from 'express';

const router = express.Router();

// Mock reputation data
let reputations = {};

// Route to get reputation score
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const score = reputations[userId] || 0;
    res.json({ userId, score });
});

// Route to update reputation score
router.post('/:userId/update', (req, res) => {
    const { userId } = req.params;
    const { score } = req.body;
    reputations[userId] = score;
    res.json({ message: 'Reputation score updated', userId, score });
});

export default router;
