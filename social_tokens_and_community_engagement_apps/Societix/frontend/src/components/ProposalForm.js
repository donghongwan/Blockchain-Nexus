import React, { useState } from 'react';

const ProposalForm = ({ onCreateProposal }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateProposal(description);
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Proposal Description</label>
                <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Create Proposal</button>
        </form>
    );
};

export default ProposalForm;
