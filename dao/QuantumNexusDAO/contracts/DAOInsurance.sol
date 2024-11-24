// SPDX-License-Identifier: MIT ```solidity
pragma solidity ^0.8.0;

contract DAOInsurance {
    struct Policy {
        address insured;
        uint coverageAmount;
        bool isActive;
    }

    mapping(address => Policy) public policies;

    event PolicyCreated(address indexed insured, uint coverageAmount);
    event PolicyClaimed(address indexed insured, uint amount);

    function createPolicy(uint coverageAmount) public {
        require(coverageAmount > 0, "Coverage amount must be greater than zero");
        policies[msg.sender] = Policy(msg.sender, coverageAmount, true);
        emit PolicyCreated(msg.sender, coverageAmount);
    }

    function claimPolicy() public {
        Policy storage policy = policies[msg.sender];
        require(policy.isActive, "No active policy found");
        policy.isActive = false;
        payable(msg.sender).transfer(policy.coverageAmount);
        emit PolicyClaimed(msg.sender, policy.coverageAmount);
    }

    receive() external payable {}
}
