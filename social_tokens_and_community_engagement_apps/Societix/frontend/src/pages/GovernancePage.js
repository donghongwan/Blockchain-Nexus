import React from 'react';
import Governance from '../components/Governance';
import ProposalForm from '../components/ProposalForm';

const GovernancePage = ({ proposals, onVote, onCreateProposal }) => {
    return (
        <div className="container">
            <h1>Governance</h1>
            <ProposalForm onCreateProposal={onCreateProposal} />
            <Governance proposals={proposals} onVote={onVote} />
        </div>
    );
};

export default GovernancePage;
