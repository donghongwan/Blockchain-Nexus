// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract GovernanceToken is ERC20, Ownable, Pausable {
    using SafeMath for uint256;

    struct Proposal {
        address proposer;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 endTime;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(address => address) public delegates; // Delegated voting
    mapping(address => uint256) public delegatedVotes; // Votes delegated to an address
    uint256 public proposalCount;
    uint256 public votingPeriod = 3 days; // Default voting period

    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string description);
    event Voted(uint256 indexed proposalId, address indexed voter, bool support);
    event ProposalExecuted(uint256 indexed proposalId);
    event Delegated(address indexed delegator, address indexed delegatee);

    constructor() ERC20("Neochronos Governance Token", "NGT") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Function to create a proposal
    function createProposal(string memory description) external whenNotPaused {
        proposals[proposalCount] = Proposal({
            proposer: msg.sender,
            description: description,
            votesFor: 0,
            votesAgainst: 0,
            endTime: block.timestamp + votingPeriod,
            executed: false
        });

        emit ProposalCreated(proposalCount, msg.sender, description);
        proposalCount++;
    }

    // Function to vote on a proposal
    function vote(uint256 proposalId, bool support) external whenNotPaused {
        require(proposalId < proposalCount, "Invalid proposal ID");
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp < proposal.endTime, "Voting period has ended");
        
        uint256 votes = balanceOf(msg.sender);
        require(votes > 0, "No voting power");

        if (delegates[msg.sender] != address(0)) {
            votes = votes.add(delegatedVotes[delegates[msg.sender]]);
        }

        if (support) {
            proposal.votesFor = proposal.votesFor.add(votes);
        } else {
            proposal.votesAgainst = proposal.votesAgainst.add(votes);
        }

        emit Voted(proposalId, msg.sender, support);
    }

    // Function to execute a proposal
    function executeProposal(uint256 proposalId) external whenNotPaused {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp >= proposal.endTime, "Voting period has not ended");
        require(!proposal.executed, "Proposal already executed");

        if (proposal.votesFor > proposal.votesAgainst) {
            // Execute the proposal (implementation depends on the proposal)
            // For example, changing a contract state or transferring tokens
        }

        proposal.executed = true;
        emit ProposalExecuted(proposalId);
    }

    // Function to delegate voting power
    function delegate(address delegatee) external whenNotPaused {
        require(delegatee != msg.sender, "Cannot delegate to self");
        delegates[msg.sender] = delegatee;
        delegatedVotes[delegatee] = delegatedVotes[delegatee].add(balanceOf(msg.sender));

        emit Delegated(msg.sender, delegatee);
    }

    // Function to burn tokens
    function burn(uint256 amount) external whenNotPaused {
        _burn(msg.sender, amount);
    }

    // Function to pause the contract
    function pause() external onlyOwner {
        _pause();
    }

    // Function to unpause the contract
    function unpause() external onlyOwner {
        _unpause();
    }

    // Function to set the voting period
    function setVotingPeriod(uint256 _votingPeriod) external onlyOwner {
        votingPeriod = _votingPeriod;
    }
}
