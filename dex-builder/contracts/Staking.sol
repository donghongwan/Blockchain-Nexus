// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";

contract Staking {
    Token public token;
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public rewards;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);

    constructor(address _token) {
        token = Token(_token);
    }

    function stake(uint256 amount) external {
        token.transferFrom(msg.sender, address(this), amount);
        stakedAmount[msg.sender] += amount;

        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(stakedAmount[msg.sender] >= amount, "Insufficient staked amount");
        stakedAmount[msg.sender] -= amount;
 token.transfer(msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    function claimRewards() external {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No rewards to claim");
        rewards[msg.sender] = 0;
        token.transfer(msg.sender, reward);

        emit RewardClaimed(msg.sender, reward);
    }

    function calculateRewards(address user) external view returns (uint256) {
        // Logic to calculate rewards based on staked amount and time
        // ...
        return rewards[user];
    }
}
