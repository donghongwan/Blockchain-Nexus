// src/components/TokenCreationForm.js
import React, { useState } from 'react';
import { createToken } from '../services/blockchainService';

const TokenCreationForm = () => {
    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [totalSupply, setTotalSupply] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createToken(tokenName, tokenSymbol, totalSupply);
            alert('Token created successfully!');
        } catch (error) {
            console.error(error);
            alert('Error creating token');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a New Token</h2>
            <input
                type="text"
                placeholder="Token Name"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Token Symbol"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Total Supply"
                value={totalSupply}
                onChange={(e) => setTotalSupply(e.target.value)}
                required
            />
            <button type="submit">Create Token</button>
        </form>
    );
};

export default TokenCreationForm;
