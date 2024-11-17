import React from 'react';
import TokenList from '../components/TokenList';

const ManageTokens = ({ tokens }) => {
    return (
        <div className="container">
            <h1>Manage Your Tokens</h1>
            <TokenList tokens={tokens} />
        </div>
    );
};

export default ManageTokens;
