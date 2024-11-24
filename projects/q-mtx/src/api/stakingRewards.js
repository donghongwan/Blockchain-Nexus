// src/api/stakingRewards.js
import express from 'express';

const router = express.Router();

// Mock staking rewards data
let stakingRewards = {};

// Route to get staking rewards for a user
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const rewards = stakingRewards[userId] || 0;
    res.json({ userId, rewards });
});

// Route to update staking rewards for a user
router.post('/:userId/update', (req, res) => {
    const { userId } = req.params;
    const { rewards } = req.body;
    stakingRewards[userId] = rewards;
    res.json({ message: 'Staking rewards updated', userId, rewards });
});

export default router;
