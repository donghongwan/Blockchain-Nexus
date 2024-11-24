// tests/CarbonCredit.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('CarbonCredit', function () {
    let CarbonCredit;
    let carbonCredit;

    beforeEach(async function () {
        CarbonCredit = await ethers.getContractFactory('CarbonCredit');
        carbonCredit = await CarbonCredit.deploy();
        await carbonCredit.deployed();
    });

    it('should issue carbon credits', async function () {
        const issue = await carbonCredit.issueCredits('userAddress', 100);
        expect(issue).to.have.property('message', '100 carbon credits issued');
    });

    it('should allow trading carbon credits', async function () {
        await carbonCredit.issueCredits('userAddress', 100);
        const trade = await carbonCredit.tradeCredits('userAddress', 'recipientAddress', 50);
        expect(trade).to.have.property('message', '50 carbon credits traded successfully');
    });
});
