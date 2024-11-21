// smart-contracts/Staking.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is Ownable {
    IERC20 public stakingToken;
    uint256 public rewardRate = 100; // Reward rate per block
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public lastStakedBlock;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);

    constructor(IERC20 _stakingToken) {
        stakingToken = _stakingToken;
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0");

        stakingToken.transferFrom(msg.sender, address(this), amount);
        stakedAmount[msg.sender] += amount;
        lastStakedBlock[msg.sender] = block.number;

        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(stakedAmount[msg.sender] >= amount, "Insufficient staked amount");

        stakedAmount[msg.sender] -= amount;
        stakingToken.transfer(msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    function calculateReward(address user) public view returns (uint256) {
        return (block.number - lastStakedBlock[user]) * rewardRate;
    }

    function claimReward() external {
        uint256 reward = calculateReward(msg.sender);
        require(reward > 0, "No reward available");

        lastStakedBlock[msg.sender] = block.number;
        stakingToken.transfer(msg.sender, reward);

        emit RewardPaid(msg.sender, reward);
    }
}
