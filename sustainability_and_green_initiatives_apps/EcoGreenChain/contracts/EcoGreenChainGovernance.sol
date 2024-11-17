// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract EcoGreenChainGovernance is Ownable {
    struct Proposal {
        uint256 id;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public totalProposals;

    event ProposalCreated(uint256 indexed id, string description);
    event Voted(uint256 indexed proposalId, bool support);

    function createProposal(string memory description) external onlyOwner {
        totalProposals++;
        proposals[totalProposals]= Proposal(totalProposals, description, 0, 0, false);
        emit ProposalCreated(totalProposals, description);
    }

    function vote(uint256 proposalId, bool support) external {
        require(!proposals[proposalId].executed, "Proposal already executed");
        if (support) {
            proposals[proposalId].votesFor++;
        } else {
            proposals[proposalId].votesAgainst++;
        }
        emit Voted(proposalId, support);
    }

    function executeProposal(uint256 proposalId) external onlyOwner {
        require(!proposals[proposalId].executed, "Proposal already executed");
        require(proposals[proposalId].votesFor > proposals[proposalId].votesAgainst, "Not enough support");

        proposals[proposalId].executed = true;
        // Logic to execute the proposal
    }
}
