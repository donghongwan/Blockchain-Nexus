// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Governance {
    struct Proposal {
        uint id;
        string description;
        uint voteCount;
        mapping(address => bool) voters;
        bool executed;
    }

    mapping(uint => Proposal) public proposals;
    uint public proposalCount;
    uint public quorum;
    address public owner;

    event ProposalCreated(uint id, string description);
    event Voted(uint proposalId, address voter);
    event ProposalExecuted(uint proposalId);

    constructor(uint _quorum) {
        owner = msg.sender;
        quorum = _quorum;
    }

    function createProposal(string memory description) public {
        proposalCount++;
        Proposal storage newProposal = proposals[proposalCount];
        newProposal.id = proposalCount;
        newProposal.description = description;
        emit ProposalCreated(proposalCount, description);
    }

    function vote(uint proposalId) public {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.voters[msg.sender], "Already voted");
        proposal.voters[msg.sender] = true;
        proposal.voteCount++;
        emit Voted(proposalId, msg.sender);
    }

    function executeProposal(uint proposalId) public {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.voteCount >= quorum, "Not enough votes");
        require(!proposal.executed, "Already executed");
        proposal.executed = true;
        emit ProposalExecuted(proposalId);
        // Execute proposal logic here
    }
}
