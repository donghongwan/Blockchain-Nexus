// tests/StakingRewards.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('StakingRewards', function () {
    let StakingRewards;
    let stakingRewards;

    beforeEach(async function () {
        StakingRewards = await ethers.getContractFactory('StakingRewards');
        stakingRewards = await StakingRewards.deploy();
        await stakingRewards.deployed();
    });

    it('should allow staking of tokens', async function () {
        await stakingRewards.stake(ethers.utils.parseEther('10'));
        const balance = await stakingRewards.getStakedAmount('userAddress');
        expect(balance).to.equal(ethers.utils.parseEther('10'));
    });

    it('should distribute rewards', async function () {
        await stakingRewards.stake(ethers.utils.parseEther('10'));
        await stakingRewards.distributeRewards();
        const rewards = await stakingRewards.getRewards('userAddress');
        expect(rewards).to.be.above(0);
    });
});
