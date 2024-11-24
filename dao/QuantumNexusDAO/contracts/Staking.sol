// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";

contract Staking {
    Token public token;
    struct Stake {
        uint amount;
        uint timestamp;
    }

    mapping(address => Stake) public stakes;

    constructor(Token _token) {
        token = _token;
    }

    function stake(uint amount) public {
        token.transferFrom(msg.sender, address(this), amount);
        stakes[msg.sender].amount += amount;
        stakes[msg.sender].timestamp = block.timestamp;
    }

    function withdraw() public {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake found");
        uint reward = calculateReward(msg.sender);
        token.transfer(msg.sender, userStake.amount + reward);
        delete stakes[msg.sender];
    }

    function calculateReward(address user) internal view returns (uint) {
        Stake storage userStake = stakes[user];
        return (userStake.amount * (block.timestamp - userStake.timestamp)) / 1 days; // Simple reward calculation
    }
}
