// tests/PriceOracle.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('PriceOracle', function () {
    let PriceOracle;
    let priceOracle;

    beforeEach(async function () {
        PriceOracle = await ethers.getContractFactory('PriceOracle');
        priceOracle = await PriceOracle.deploy();
        await priceOracle.deployed();
    });

    it('should set and get the price', async function () {
        await priceOracle.setPrice(200);
        const price = await priceOracle.getPrice();
        expect(price).to.equal(200);
    });
});
