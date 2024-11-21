// src/hooks/useToken.js
import { useState, useEffect } from 'react';
import { createToken, getTokenDetails } from '../services/blockchainService';

const useToken = () => {
    const [tokenDetails, setTokenDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createNewToken = async (name, symbol, totalSupply) => {
        setLoading(true);
        try {
            await createToken(name, symbol, totalSupply);
            const details = await getTokenDetails(symbol);
            setTokenDetails(details);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        tokenDetails,
        loading,
        error,
        createNewToken,
    };
};

export default useToken;
