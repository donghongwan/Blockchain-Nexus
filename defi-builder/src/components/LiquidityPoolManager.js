// src/components/LiquidityPoolManager.js
import React, { useState } from 'react';
import { addLiquidity, removeLiquidity } from '../services/blockchainService';

const LiquidityPoolManager = () => {
    const [tokenA, setTokenA] = useState('');
    const [tokenB, setTokenB] = useState('');
    const [amountA, setAmountA] = useState('');
    const [amountB, setAmountB] = useState('');

    const handleAddLiquidity = async (e) => {
        e.preventDefault();
        try {
            await addLiquidity(tokenA, tokenB, amountA, amountB);
            alert('Liquidity added successfully!');
        } catch (error) {
            console.error(error);
            alert('Error adding liquidity');
        }
    };

    const handleRemoveLiquidity = async (e) => {
        e.preventDefault();
        try {
            await removeLiquidity(tokenA, tokenB, amountA, amountB);
            alert('Liquidity removed successfully!');
        } catch (error) {
            console.error(error);
            alert('Error removing liquidity');
        }
    };

    return (
        <div>
            <h2>Liquidity Pool Manager</h2>
            <form onSubmit={handleAddLiquidity}>
                <h3>Add Liquidity</h3>
                <input
                    type="text"
                    placeholder="Token A Address"
                    value={tokenA}
                    onChange={(e) => setTokenA(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Token B Address"
                    value={tokenB}
                    onChange={(e) => setTokenB(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount of Token A"
                    value={amountA}
                    onChange={(e) => setAmountA(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount of Token B"
                    value={amountB}
                    onChange={(e) => setAmountB(e.target.value)}
                    required
                />
                <button type="submit">Add Liquidity</button>
            </form>
            <form onSubmit={handleRemoveLiquidity}>
                <h3>Remove Liquidity</h3>
                <input
                    type="text"
                    placeholder="Token A Address"
                    value={tokenA}
                    onChange={(e) => setTokenA(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Token B Address"
                    value={tokenB}
                    onChange={(e) => setTokenB(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount of Token A"
                    value={amountA}
                    onChange={(e) => setAmountA(e .target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount of Token B"
                    value={amountB}
                    onChange={(e) => setAmountB(e.target.value)}
                    required
                />
                <button type="submit">Remove Liquidity</button>
            </form>
        </div>
    );
};

export default LiquidityPoolManager;
