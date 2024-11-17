// src/components/TokenBalance.js
import React from 'react';

const TokenBalance = ({ balance }) => {
    return (
        <div>
            <h3>Your Token Balance: {balance} NGT</h3>
        </div>
    );
};

export default TokenBalance;
