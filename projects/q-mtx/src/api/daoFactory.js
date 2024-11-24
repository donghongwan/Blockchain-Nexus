// src/api/daoFactory.js
import express from 'express';

const router = express.Router();

// Mock DAOs
let daos = [];

// Route to get all DAOs
router.get('/', (req, res) => {
    res.json(daos);
});

// Route to create a new DAO
router.post('/', (req, res) => {
    const { name, members } = req.body;
    const newDAO = { id: daos.length + 1, name, members };
    daos.push(newDAO);
    res.status(201).json(newDAO);
});

export default router;
