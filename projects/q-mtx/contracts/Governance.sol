// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Governance is Ownable {
    using SafeMath for uint256;

    struct Proposal {
        string description;
        uint256 voteCount;
        mapping(address => bool) voters;
        bool executed;
    }

    Proposal[] public proposals;
    uint256 public proposalCount;

    event ProposalCreated(uint256 indexed proposalId, string description);
    event Voted(uint256 indexed proposalId, address indexed voter);
    event ProposalExecuted(uint256 indexed proposalId);

    constructor() {
        proposalCount = 0;
    }

    // Function to create a new proposal
    function createProposal(string memory _description) external only Owner {
        Proposal storage newProposal = proposals.push();
        newProposal.description = _description;
        newProposal.voteCount = 0;
        newProposal.executed = false;
        proposalCount++;
        emit ProposalCreated(proposalCount - 1, _description);
    }

    // Function to vote on a proposal
    function vote(uint256 _proposalId) external {
        require(_proposalId < proposalCount, "Invalid proposal ID");
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.voters[msg.sender], "You have already voted on this proposal");

        proposal.voters[msg.sender] = true;
        proposal.voteCount++;
        emit Voted(_proposalId, msg.sender);
    }

    // Function to execute a proposal if it has enough votes
    function executeProposal(uint256 _proposalId) external onlyOwner {
        require(_proposalId < proposalCount, "Invalid proposal ID");
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.executed, "Proposal already executed");

        // Here you can add logic to check if the proposal has enough votes to be executed
        // For simplicity, let's assume any proposal can be executed by the owner
        proposal.executed = true;
        emit ProposalExecuted(_proposalId);
        
        // Implement the logic to change parameters in StableCoinManager or other contracts as needed
    }
}
