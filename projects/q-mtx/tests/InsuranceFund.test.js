// tests/InsuranceFund.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('InsuranceFund', function () {
    let InsuranceFund;
    let insuranceFund;

    beforeEach(async function () {
        InsuranceFund = await ethers.getContractFactory('InsuranceFund');
        insuranceFund = await InsuranceFund.deploy();
        await insuranceFund.deployed();
    });

    it('should allow deposits to the fund', async function () {
        await insuranceFund.deposit({ value: ethers.utils.parseEther('10') });
        const balance = await insuranceFund.getBalance();
        expect(balance).to.equal(ethers.utils.parseEther('10'));
    });

    it('should allow withdrawals from the fund', async function () {
        await insuranceFund.deposit({ value: ethers.utils.parseEther('10') });
        await insuranceFund.withdraw(ethers.utils.parseEther('5'));
        const balance = await insuranceFund.getBalance();
        expect(balance).to.equal(ethers.utils.parseEther('5'));
    });
});
