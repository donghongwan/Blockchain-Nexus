// src/components/StakingDashboard.js
import React, { useState, useEffect } from 'react';
import { stakeTokens, getStakedAmount } from '../services/blockchainService';

const StakingDashboard = () => {
    const [amount, setAmount] = useState('');
    const [stakedAmount, setStakedAmount] = useState(0);

    useEffect(() => {
        const fetchStakedAmount = async () => {
            const amount = await getStakedAmount();
            setStakedAmount(amount);
        };
        fetchStakedAmount();
    }, []);

    const handleStake = async (e) => {
        e.preventDefault();
        try {
            await stakeTokens(amount);
            alert('Tokens staked successfully!');
        } catch (error) {
            console.error(error);
            alert('Error staking tokens');
        }
    };

    return (
        <div>
            <h2>Staking Dashboard</h2>
            <p>Currently Staked: {stakedAmount} Tokens</p>
            <form onSubmit={handleStake}>
                <input
                    type="number"
                    placeholder="Amount to Stake"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button type="submit">Stake Tokens</button>
            </form>
        </div>
    );
};

export default StakingDashboard;
