// src/api/aiOracle.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

// Route to request data from the AI oracle
router.post('/request', async (req, res) => {
    const { query } = req.body;
    try {
        const response = await axios.post('https://ai-oracle.example.com/api', { query });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from AI oracle:', error);
        res.status(500).json({ error: 'Failed to fetch data from AI oracle' });
    }
});

export default router;
