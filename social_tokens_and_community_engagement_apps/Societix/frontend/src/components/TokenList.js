import React from 'react';

const TokenList = ({ tokens }) => {
    return (
        <div>
            <h2>Your Tokens</h2>
            <ul className="list-group">
                {tokens.map((token, index) => (
                    <li key={index} className="list-group-item">
                        {token.name} ({token.symbol}) - Supply: {token.supply}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TokenList;
