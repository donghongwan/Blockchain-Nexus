// src/api/supply.js
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Supply schema
const supplySchema = new mongoose.Schema({
    totalSupply: Number,
    circulatingSupply: Number,
    timestamp: { type: Date, default: Date.now },
});

const Supply = mongoose.model('Supply', supplySchema);

// Route to get supply information
router.get('/', async (req, res) => {
    try {
        const supplyData = await Supply.findOne().sort({ timestamp: -1 }); // Get the latest supply data
        if (!supplyData) {
            return res.status(404).json({ error: 'Supply data not found' });
        }
        res.json(supplyData);
    } catch (error) {
        console.error('Error fetching supply data:', error);
        res.status(500).json({ error: 'Failed to fetch supply data' });
    }
});

// Route to update supply information (for demonstration purposes)
router.post('/', async (req, res) => {
    const { totalSupply, circulatingSupply } = req.body;
    try {
        const newSupply = new Supply({ totalSupply, circulatingSupply });
        await newSupply.save();
        res.status(201).json(newSupply);
    } catch (error) {
        console.error('Error saving supply data:', error);
        res.status(500).json({ error: 'Failed to save supply data' });
    }
});

export default router;
