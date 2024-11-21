// src/hooks/useStaking.js
import { useState, useEffect } from 'react';
import { stakeTokens, getStakedAmount } from '../services/blockchainService';

const useStaking = () => {
    const [stakedAmount, setStakedAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const stake = async (amount) => {
        setLoading(true);
        try {
            await stakeTokens(amount);
            const updatedAmount = await getStakedAmount();
            setStakedAmount(updatedAmount);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchStakedAmount = async () => {
            setLoading(true);
            try {
                const amount = await getStakedAmount();
                setStakedAmount(amount);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStakedAmount();
    }, []);

    return {
        stakedAmount,
        loading,
        error,
        stake,
    };
};

export default useStaking;
