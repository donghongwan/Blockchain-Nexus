// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakingRewards {
    IERC20 public stakingToken;
    uint256 public rewardRate; // Reward rate per block
    uint256 public lastUpdateBlock;

    struct Stake {
        uint256 amount;
        uint256 rewardDebt;
    }

    mapping(address => Stake) public stakes;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);

    constructor(IERC20 _stakingToken, uint256 _rewardRate) {
        stakingToken = _stakingToken;
        rewardRate = _rewardRate;
        lastUpdateBlock = block.number;
    }

    function stake(uint256 _amount) public {
        require(_amount > 0, "Amount must be greater than 0");
        updateRewards(msg.sender);

        stakingToken.transferFrom(msg.sender, address(this), _amount);
        stakes[msg.sender].amount += _amount;
        emit Staked(msg.sender, _amount);
    }

    ```solidity
    function unstake(uint256 _amount) public {
        require(stakes[msg.sender].amount >= _amount, "Insufficient staked amount");
        updateRewards(msg.sender);

        stakes[msg.sender].amount -= _amount;
        stakingToken.transfer(msg.sender, _amount);
        emit Unstaked(msg.sender, _amount);
    }

    function claimRewards() public {
        updateRewards(msg.sender);
        uint256 reward = stakes[msg.sender].rewardDebt;
        require(reward > 0, "No rewards to claim");

        stakes[msg.sender].rewardDebt = 0; // Reset reward debt
        // Logic to transfer rewards (could be in a different token)
        // For simplicity, assuming rewards are paid in the staking token
        stakingToken.transfer(msg.sender, reward);
        emit RewardClaimed(msg.sender, reward);
    }

    function updateRewards(address _user) internal {
        // Logic to calculate and update rewards based on the staking duration
        uint256 blocksStaked = block.number - lastUpdateBlock;
        uint256 reward = stakes[_user].amount * rewardRate * blocksStaked;
        stakes[_user].rewardDebt += reward;
        lastUpdateBlock = block.number;
    }
}
