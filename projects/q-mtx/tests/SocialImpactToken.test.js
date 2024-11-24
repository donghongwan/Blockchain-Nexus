// tests/SocialImpactToken.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('SocialImpactToken', function () {
    let SocialImpactToken;
    let socialImpactToken;

    beforeEach(async function () {
        SocialImpactToken = await ethers.getContractFactory('SocialImpactToken');
        socialImpactToken = await SocialImpactToken.deploy();
        await socialImpactToken.deployed();
    });

    it('should create a new social impact token', async function () {
        const token = await socialImpactToken.createToken('Impact Token', 'IMPT', 1000);
        expect(token).to.have.property('name', 'Impact Token');
    });

    it('should allow donations using the token', async function () {
        await socialImpactToken.createToken('Impact Token', 'IMPT', 1000);
        const donation = await socialImpactToken.donate('recipientAddress', 100);
        expect(donation).to.have.property('message', '100 tokens donated successfully');
    });
});
