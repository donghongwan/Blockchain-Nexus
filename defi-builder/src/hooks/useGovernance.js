// src/hooks/useGovernance.js
import { useState, useEffect } from 'react';
import { getProposals, voteOnProposal } from '../services/blockchainService';

const useGovernance = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProposals = async () => {
        setLoading(true);
        try {
            const fetchedProposals = await getProposals();
            setProposals(fetchedProposals);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const vote = async (proposalId) => {
        setLoading(true);
        try {
            await voteOnProposal(proposalId);
            await fetchProposals(); // Refresh proposals after voting
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProposals();
    }, []);

    return {
        proposals,
        loading,
        error,
        vote,
    };
};

export default useGovernance;
