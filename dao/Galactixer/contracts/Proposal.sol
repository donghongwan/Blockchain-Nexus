// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Proposal {
    string public description;
    address public creator;
    mapping(address => bool) public votes;
    uint256 public voteCount;
    uint256 public approvalThreshold;
    bool public executed;

    event Voted(address voter, bool support);
    event Executed();

    constructor(string memory _description, address _creator) {
        description = _description;
        creator = _creator;
        approvalThreshold = 3; // Example threshold
    }

    function vote(address voter, bool support) public {
        require(!votes[voter], "Already voted");
        votes[voter] = true;
        voteCount++;
        emit Voted(voter, support);
    }

    function isActive() public view returns (bool) {
        return !executed && voteCount < approvalThreshold;
    }

    function isApproved() public view returns (bool) {
        return voteCount >= approvalThreshold;
    }

    function execute() public {
        require(isApproved(), "Proposal not approved");
        executed = true;
        emit Executed();
        // Logic to execute the proposal
    }
}
