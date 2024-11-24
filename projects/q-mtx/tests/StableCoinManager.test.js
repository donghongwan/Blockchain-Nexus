// tests/StableCoinManager.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('StableCoinManager', function () {
    let StableCoinManager;
    let stableCoinManager;

    beforeEach(async function () {
        StableCoinManager = await ethers.getContractFactory('StableCoinManager');
        stableCoinManager = await StableCoinManager.deploy();
        await stableCoinManager.deployed();
    });

    it('should stabilize the coin price', async function () {
        await stableCoinManager.stabilizePrice();
        const price = await stableCoinManager.getPrice();
        expect(price).to.be.closeTo(1, 0.01); // Assuming price stabilization around $1
    });
});
