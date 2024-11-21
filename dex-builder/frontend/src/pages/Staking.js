import React, { useState } from 'react';

const Staking = () => {
    const [amount, setAmount] = useState('');

    const handleStake = async () => {
        // Logic to interact with the Staking contract
        // ...
    };

    return (
        <div>
            <h2>Stake Tokens</h2>
            <input
                type="number"
                placeholder ="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleStake}>Stake</button>
        </div>
    );
};

export default Staking;
