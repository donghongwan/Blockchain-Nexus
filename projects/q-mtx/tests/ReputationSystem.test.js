// tests/ReputationSystem.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ReputationSystem', function () {
    let ReputationSystem;
    let reputationSystem;

    beforeEach(async function () {
        ReputationSystem = await ethers.getContractFactory('ReputationSystem');
        reputationSystem = await ReputationSystem.deploy();
        await reputationSystem.deployed();
    });

    it('should assign reputation points', async function () {
        await reputationSystem.assignReputation('userAddress', 10);
        const reputation = await reputationSystem.getReputation('userAddress');
        expect(reputation).to.equal(10);
    });
});
