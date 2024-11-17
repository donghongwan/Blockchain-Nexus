import React, { useState } from 'react';

const TokenForm = ({ onCreateToken }) => {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [supply, setSupply] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateToken(name, symbol, supply);
        setName('');
        setSymbol('');
        setSupply('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Token Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Token Symbol</label>
                <input type="text" className="form-control" value={symbol} onChange={(e) => setSymbol(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Initial Supply</label>
                <input type="number" className="form-control" value={supply} onChange={(e) => setSupply(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Create Token</button>
        </form>
    );
};

export default TokenForm;
