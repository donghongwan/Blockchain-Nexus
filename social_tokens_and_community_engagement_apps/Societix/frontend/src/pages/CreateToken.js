import React from 'react';
import TokenForm from '../components/TokenForm';

const CreateToken = ({ onCreateToken }) => {
    return (
        <div className="container">
            <h1>Create a New Token</h1>
            <TokenForm onCreateToken={onCreateToken} />
        </div>
    );
};

export default CreateToken;
