// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GovernanceToken is ERC20, Ownable {
    event ProposalCreated(uint256 indexed proposalId, string description);
    event Voted(uint256 indexed proposalId, address indexed voter, bool support);

    struct Proposal {
        string description;
        uint256 voteCountFor;
        uint256 voteCountAgainst;
        mapping(address => bool) hasVoted;
    }

    Proposal[] public proposals;

    constructor() ERC20("GovernanceToken", "GOV") {}

    function createProposal(string memory _description) public onlyOwner {
        proposals.push(Proposal({
            description: _description,
            voteCountFor: 0,
 voteCountAgainst: 0
        }));
        emit ProposalCreated(proposals.length - 1, _description);
    }

    function vote(uint256 _proposalId, bool _support) public {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        require(!proposals[_proposalId].hasVoted[msg.sender], "You have already voted on this proposal");

        proposals[_proposalId].hasVoted[msg.sender] = true;

        if (_support) {
            proposals[_proposalId].voteCountFor++;
        } else {
            proposals[_proposalId].voteCountAgainst++;
        }

        emit Voted(_proposalId, msg.sender, _support);
    }

    function getProposal(uint256 _proposalId) public view returns (string memory description, uint256 voteCountFor, uint256 voteCountAgainst) {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        Proposal storage proposal = proposals[_proposalId];
        return (proposal.description, proposal.voteCountFor, proposal.voteCountAgainst);
    }
}
