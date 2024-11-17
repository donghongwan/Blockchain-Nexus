// contracts/Governance.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Governance {
    struct Proposal {
        string description;
        uint256 voteCount;
        mapping(address => bool) voters;
    }

    Proposal[] public proposals;

    function createProposal(string memory _description) public {
        proposals.push(Proposal({description: _description, voteCount: 0}));
    }

    function vote(uint256 _proposalId) public {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.voters[msg.sender], "You have already voted");
        proposal.voters[msg.sender] = true;
        proposal.voteCount++;
    }
}
