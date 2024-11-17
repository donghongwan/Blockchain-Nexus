import React from 'react';

const Governance = ({ proposals, onVote }) => {
    return (
        <div>
            <h2>Governance Proposals</h2>
            <ul className="list-group">
                {proposals.map((proposal, index) => (
                    <li key={index} className="list-group-item">
                        {proposal.description}
                        <button className="btn btn-success float-end" onClick={() => onVote(proposal.id)}>Vote</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Governance;
