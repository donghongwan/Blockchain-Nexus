// tests/DerivativeContracts.test.js ```javascript
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('DerivativeContracts', function () {
    let DerivativeContracts;
    let derivativeContracts;

    beforeEach(async function () {
        DerivativeContracts = await ethers.getContractFactory('DerivativeContracts');
        derivativeContracts = await DerivativeContracts.deploy();
        await derivativeContracts.deployed();
    });

    it('should create a new derivative contract', async function () {
        const contract = await derivativeContracts.createContract('Contract A', ethers.utils.parseEther('100'));
        expect(contract).to.have.property('name', 'Contract A');
    });

    it('should allow exercising the derivative', async function () {
        await derivativeContracts.createContract('Contract A', ethers.utils.parseEther('100'));
        const exercise = await derivativeContracts.exerciseContract(1);
        expect(exercise).to.have.property('message', 'Contract exercised successfully');
    });
});
