// src/api/governance.js
import express from 'express';

const router = express.Router();

// Mock governance proposals
let proposals = [];

// Route to get all proposals
router.get('/', (req, res) => {
    res.json(proposals);
});

// Route to create a new proposal
router.post('/', (req, res) => {
    const { title, description } = req.body;
    const newProposal = { id: proposals.length + 1, title, description, status: 'pending' };
    proposals.push(newProposal);
    res.status(201).json(newProposal);
});

// Route to vote on a proposal
router.post('/:id/vote', (req, res) => {
    const { id } = req.params;
    const { vote } = req.body; // vote can be 'yes' or 'no'
    const proposal = proposals.find(p => p.id === parseInt(id));
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });

    proposal.votes = proposal.votes || { yes: 0, no: 0 };
    proposal.votes[vote] += 1;
    res.json(proposal);
});

export default router;
