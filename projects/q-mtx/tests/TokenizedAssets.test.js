// tests/TokenizedAssets.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('TokenizedAssets', function () {
    let TokenizedAssets;
    let tokenizedAssets;

    beforeEach(async function() {
        TokenizedAssets = await ethers.getContractFactory('TokenizedAssets');
        tokenizedAssets = await TokenizedAssets.deploy();
        await tokenizedAssets.deployed();
    });

    it('should create a new tokenized asset', async function () {
        const asset = await tokenizedAssets.createAsset('Real Estate', 'Description of Real Estate', ethers.utils.parseEther('100'));
        expect(asset).to.have.property('name', 'Real Estate');
    });

    it('should allow trading of tokenized assets', async function () {
        await tokenizedAssets.createAsset('Real Estate', 'Description of Real Estate', ethers.utils.parseEther('100'));
        const trade = await tokenizedAssets.tradeAsset(1, ethers.utils.parseEther('50'));
        expect(trade).to.have.property('message', 'Asset traded successfully');
    });
});
