// src/hooks/useLiquidity.js
import { useState } from 'react';
import { addLiquidity, removeLiquidity } from '../services/blockchainService';

const useLiquidity = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addNewLiquidity = async (tokenA, tokenB, amountA, amountB) => {
        setLoading(true);
        try {
            await addLiquidity(tokenA, tokenB, amountA, amountB);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const removeExistingLiquidity = async (tokenA, tokenB, amountA, amountB) => {
        setLoading(true);
        try {
            await removeLiquidity(tokenA, tokenB, amountA, amountB);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        addNewLiquidity,
        removeExistingLiquidity,
    };
};

export default useLiquidity;
