// tests/AIOracle.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('AIOracle', function () {
    let AIOracle;
    let aiOracle;

    beforeEach(async function () {
        AIOracle = await ethers.getContractFactory('AIOracle');
        aiOracle = await AIOracle.deploy();
        await aiOracle.deployed();
    });

    it('should fetch data from AI model', async function () {
        const data = await aiOracle.fetchData();
        expect(data).to.exist; // Assuming the AI model returns some data
    });
});
