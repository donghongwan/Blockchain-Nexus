// src/components/GovernanceVoting.js
import React, { useState, useEffect } from 'react';
import { getProposals, voteOnProposal } from '../services/blockchainService';

const GovernanceVoting = () => {
    const [proposals, setProposals] = useState([]);
    const [selectedProposal, setSelectedProposal] = useState('');

    useEffect(() => {
        const fetchProposals = async () => {
            const proposals = await getProposals();
            setProposals(proposals);
        };
        fetchProposals();
    }, []);

    const handleVote = async (e) => {
        e.preventDefault();
        try {
            await voteOnProposal(selectedProposal);
            alert('Vote cast successfully!');
        } catch (error) {
            console.error(error);
            alert('Error casting vote');
        }
    };

    return (
        <div>
            <h2>Governance Voting</h2>
            <form onSubmit={handleVote}>
                <select onChange={(e) => setSelectedProposal(e.target.value)} required>
                    <option value="">Select a Proposal</option>
                    {proposals.map((proposal) => (
                        <option key={proposal.id} value={proposal.id}>
                            {proposal.title}
                        </option>
                    ))}
                </select>
                <button type="submit">Vote</button>
            </form>
        </div>
    );
};

export default GovernanceVoting;
