// tests/FlashLoan.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('FlashLoan', function () {
    let FlashLoan;
    let flashLoan;

    beforeEach(async function () {
        FlashLoan = await ethers.getContractFactory('FlashLoan');
        flashLoan = await FlashLoan.deploy();
        await flashLoan.deployed();
    });

    it('should execute a flash loan', async function () {
        const loanAmount = ethers.utils.parseEther('10');
        const result = await flashLoan.executeFlashLoan(loanAmount);
        expect(result).to.have.property('message', 'Flash loan executed successfully');
    });
});
