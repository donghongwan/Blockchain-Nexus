// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymentContract is Ownable {
    event PaymentMade(address indexed sender, address indexed recipient, uint256 amount);
    event KYCCompleted(address indexed user);

    struct User {
        bool isKYCCompleted;
        uint256 balance;
    }

    mapping(address => User) private users;

    modifier onlyKYCCompleted() {
        require(users[msg.sender].isKYCCompleted, "KYC not completed");
        _;
    }

    function completeKYC() external {
        users[msg.sender].isKYCCompleted = true;
        emit KYCCompleted(msg.sender);
    }

    function deposit() external payable onlyKYCCompleted {
        users[msg.sender].balance += msg.value;
    }

    function transfer(address payable recipient, uint256 amount) external onlyKYCCompleted {
        require(users[msg.sender].balance >= amount, "Insufficient balance");
        users[msg.sender].balance -= amount;
        recipient.transfer(amount);
        emit PaymentMade(msg.sender, recipient, amount);
    }

    function getBalance() external view onlyKYCCompleted returns (uint256) {
        return users[msg.sender].balance;
    }
}
