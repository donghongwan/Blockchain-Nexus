// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract YieldFarm is Ownable, Pausable {
    using SafeMath for uint256;

    IERC20 public stakingToken; // Token that users will stake
    IERC20 public rewardToken; // Token that users will earn as rewards

    struct UserInfo {
        uint256 amount; // Amount of tokens staked
        uint256 rewardDebt; // Reward debt for the user
        uint256 lastStakedTime; // Last time the user staked
    }

    mapping(address => UserInfo) public userInfo;

    uint256 public totalStaked; // Total amount of tokens staked
    uint256 public rewardPerBlock; // Reward distributed per block
    uint256 public lastRewardBlock; // Last block number that rewards were distributed
    uint256 public accRewardPerShare; // Accumulated rewards per share

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);

    constructor(address _stakingToken, address _rewardToken, uint256 _rewardPerBlock) {
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
        rewardPerBlock = _rewardPerBlock;
        lastRewardBlock = block.number;
    }

    // Update rewards for the user
    function updateRewards(address user) internal {
        UserInfo storage userInfo = userInfo[user];
        if (userInfo.amount > 0) {
            uint256 pendingReward = userInfo.amount.mul(accRewardPerShare).div(1e12).sub(userInfo.rewardDebt);
            if (pendingReward > 0) {
                rewardToken.transfer(user, pendingReward);
                emit RewardsClaimed(user, pendingReward);
            }
        }
    }

    // Function to stake tokens
    function stake(uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be greater than zero");

        updateRewards(msg.sender);

        stakingToken.transferFrom(msg.sender, address(this), amount);
        UserInfo storage user = userInfo[msg.sender];
        user.amount = user.amount.add(amount);
        user.lastStakedTime = block.timestamp;

        totalStaked = totalStaked.add(amount);
        user.rewardDebt = user.amount.mul(accRewardPerShare).div(1e12);

        emit Staked(msg.sender, amount);
    }

    // Function to unstake tokens
    function unstake(uint256 amount) external whenNotPaused {
        UserInfo storage user = userInfo[msg.sender];
        require(user.amount >= amount, "Insufficient staked amount");

        updateRewards(msg.sender);

        user.amount = user.amount.sub(amount);
        totalStaked = totalStaked.sub(amount);
        stakingToken.transfer(msg.sender, amount);

        user.rewardDebt = user.amount.mul(accRewardPerShare).div(1e12);

        emit Unstaked(msg.sender, amount);
    }

    // Function to claim rewards
    function claimRewards() external whenNotPaused {
        updateRewards(msg.sender);
    }

    // Function to update rewards per block
    function updateRewardPerBlock(uint256 _rewardPerBlock) external onlyOwner {
        updateRewards(msg.sender);
        rewardPerBlock = _rewardPerBlock;
        lastRewardBlock = block.number;
    }

    // Function to distribute rewards
    function distributeRewards() external onlyOwner {
        require(totalStaked > 0, "No staked tokens");

        uint256 blocks = block.number.sub(lastRewardBlock);
        uint256 reward = blocks.mul(rewardPerBlock);
        accRewardPerShare = accRewardPerShare.add(reward.mul(1e12).div(totalStaked));
        lastRewardBlock = block.number;
    }

    // Function to pause the contract
    function pause() external onlyOwner {
        _pause();
    }

    // Function to unpause the contract
    function unpause() external onlyOwner {
        _unpause();
    }

    // Function to emergency withdraw tokens
    function emergencyWithdraw() external {
        UserInfo storage user = userInfo[msg.sender];
        uint256 amount = user.amount;
        require(amount > 0, "No tokens to withdraw");

        user.amount = 0;
        totalStaked = totalStaked.sub(amount);
        stakingToken.transfer(msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    // Function to view pending rewards for a user
    function pendingRewards(address user) external view returns (uint256) {
        UserInfo storage userInfo = userInfo[user];
        uint256 accReward = accRewardPerShare;
        if (block.number > lastRewardBlock && totalStaked > 0) {
            uint256 blocks = block.number.sub(lastRewardBlock);
            uint256 reward = blocks.mul(rewardPerBlock);
            accReward = accReward.add(reward.mul(1e12).div(totalStaked));
        }
        return userInfo.amount.mul(accReward).div(1e12).sub(userInfo.rewardDebt);
    }
}
