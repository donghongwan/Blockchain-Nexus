// smart_contracts/governance_contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Governance {
    struct Proposal {
        address proposer;
        string description;
        uint256 voteCount;
        uint256 endTime;
        bool executed;
    }

    IERC20 public token; // The governance token
    mapping(uint256 => Proposal) public proposals; // Mapping of proposal ID to Proposal
    mapping(address => mapping(uint256 => bool)) public votes; // Mapping of user votes
    uint256 public proposalCount; // Counter for proposals

    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string description, uint256 endTime);
    event Voted(uint256 indexed proposalId, address indexed voter);
    event ProposalExecuted(uint256 indexed proposalId);

    constructor(IERC20 _token) {
        token = _token;
    }

    function createProposal(string memory _description, uint256 _duration) external {
        require(_duration > 0, "Duration must be greater than zero");

        proposalCount++;
        uint256 endTime = block.timestamp + _duration;

        proposals[proposalCount] = Proposal({
            proposer: msg.sender,
            description: _description,
            voteCount: 0,
            endTime: endTime,
            executed: false
        });

        emit ProposalCreated(proposalCount, msg.sender, _description, endTime);
    }

    function vote(uint256 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp < proposal.endTime, "Voting has ended");
        require(!votes[msg.sender][_proposalId], "You have already voted");

        uint256 voterBalance = token.balanceOf(msg.sender);
        require(voterBalance > 0, "You must hold tokens to vote");

        votes[msg.sender][_proposalId] = true;
        proposal.voteCount += voterBalance;

        emit Voted(_proposalId, msg.sender);
    }

    function executeProposal(uint256 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp >= proposal.endTime, "Voting is still ongoing");
        require !proposal.executed, "Proposal has already been executed");
        require(proposal.voteCount > 0, "No votes have been cast");

        // Logic to execute the proposal would go here
        // For example, it could involve transferring funds, changing parameters, etc.

        proposal.executed = true;
        emit ProposalExecuted(_proposalId);
    }

    function getProposal(uint256 _proposalId) external view returns (address, string memory, uint256, uint256, bool) {
        Proposal storage proposal = proposals[_proposalId];
        return (proposal.proposer, proposal.description, proposal.voteCount, proposal.endTime, proposal.executed);
    }
}
