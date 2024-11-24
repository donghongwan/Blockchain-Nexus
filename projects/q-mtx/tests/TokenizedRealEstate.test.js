// tests/TokenizedRealEstate.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('TokenizedRealEstate', function () {
    let TokenizedRealEstate;
    let tokenizedRealEstate;

    beforeEach(async function () {
        TokenizedRealEstate = await ethers.getContractFactory('TokenizedRealEstate');
        tokenizedRealEstate = await TokenizedRealEstate.deploy();
        await tokenizedRealEstate.deployed();
    });

    it('should create a tokenized real estate asset', async function () {
        const asset = await tokenizedRealEstate.createAsset('Luxury Apartment', 'Description of Luxury Apartment', ethers.utils.parseEther('500'));
        expect(asset).to.have.property('name', 'Luxury Apartment');
    });
});
