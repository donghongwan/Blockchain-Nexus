// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./GalactixerToken.sol";
import "./Proposal.sol";

contract Galactixer {
    GalactixerToken public token;
    address public owner;
    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;

    event ProposalCreated(uint256 proposalId, string description);
    event Voted(uint256 proposalId, address voter, bool support);

    constructor(GalactixerToken _token) {
        token = _token;
        owner = msg.sender;
    }

    function createProposal(string memory description) public {
        proposalCount++;
        proposals[proposalCount] = new Proposal(description, msg.sender);
        emit ProposalCreated(proposalCount, description);
    }

    function vote(uint256 proposalId, bool support) public {
        require(proposals[proposalId].isActive(), "Proposal is not active");
        proposals[proposalId].vote(msg.sender, support);
        emit Voted(proposalId, msg.sender, support);
    }

    function executeProposal(uint256 proposalId) public {
        require(proposals[proposalId].isApproved(), "Proposal not approved");
        proposals[proposalId].execute();
    }
}
