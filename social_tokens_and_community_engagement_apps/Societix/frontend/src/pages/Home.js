import React from 'react';
import TokenList from '../components/TokenList';
import TokenForm from '../components/TokenForm';

const Home = ({ tokens, onCreateToken }) => {
    return (
        <div className="container">
            <h1>Welcome to Societix</h1>
            <TokenForm onCreateToken={onCreateToken} />
            <TokenList tokens={tokens} />
        </div>
    );
};

export default Home;
