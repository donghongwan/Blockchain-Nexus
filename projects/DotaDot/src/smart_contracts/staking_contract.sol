// smart_contracts/staking_contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakingContract {
    struct Stake {
        uint256 amount; // Amount staked
        uint256 rewardDebt; // Reward debt for the user
        uint256 lastUpdate; // Last time the user staked or withdrew
    }

    IERC20 public stakingToken; // The token that users will stake
    uint256 public totalStaked; // Total amount staked in the contract
    uint256 public rewardPerToken; // Reward per token staked
    uint256 public lastRewardTime; // Last time rewards were distributed
    uint256 public rewardRate; // Rate of reward distribution per second

    mapping(address => Stake) public stakes; // Mapping of user stakes

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);

    constructor(IERC20 _stakingToken, uint256 _rewardRate) {
        stakingToken = _stakingToken;
        rewardRate = _rewardRate;
        lastRewardTime = block.timestamp;
    }

    function updateRewards() internal {
        if (totalStaked > 0) {
            uint256 timeElapsed = block.timestamp - lastRewardTime;
            rewardPerToken += (timeElapsed * rewardRate) / totalStaked;
        }
        lastRewardTime = block.timestamp;
    }

    function stake(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");

        updateRewards();

        Stake storage userStake = stakes[msg.sender];
        userStake.rewardDebt = (userStake.amount * rewardPerToken) / 1e18; // Update reward debt

        userStake.amount += _amount;
        totalStaked += _amount;

        stakingToken.transferFrom(msg.sender, address(this), _amount);
        emit Staked(msg.sender, _amount);
    }

    function unstake(uint256 _amount) external {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount >= _amount, "Insufficient staked amount");

        updateRewards();

        userStake.rewardDebt = (userStake.amount * rewardPerToken) / 1e18; // Update reward debt
        userStake.amount -= _amount;
        totalStaked -= _amount;

        stakingToken.transfer(msg.sender, _amount);
        emit Unstaked(msg.sender, _amount);
    }

    function claimRewards() external {
        updateRewards();

        Stake storage userStake = stakes[msg.sender];
        uint256 pendingReward = (userStake.amount * rewardPerToken) / 1e18 - userStake.rewardDebt;

        require(pendingReward > 0, "No rewards to claim");

        userStake.rewardDebt = (userStake.amount * rewardPerToken) / 1e18; // Update reward debt

        stakingToken.transfer(msg.sender, pendingReward);
        emit RewardClaimed(msg.sender, pendingReward);
    }

    function getPendingRewards(address _user) external view returns (uint256) {
        Stake storage userStake = stakes[_user];
        uint256 currentRewardPerToken = rewardPerToken + ((block.timestamp - lastRewardTime) * rewardRate) / totalStaked;
        return (userStake.amount * currentRewardPerToken) / 1e18 - userStake.rewardDebt;
    }
}
