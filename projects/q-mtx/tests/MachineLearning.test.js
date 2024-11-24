// tests/MachineLearning.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('MachineLearning', function () {
    let MachineLearning;
    let machineLearning;

    beforeEach(async function () {
        MachineLearning = await ethers.getContractFactory('MachineLearning');
        machineLearning = await MachineLearning.deploy();
        await machineLearning.deployed();
    });

    it('should train a model', async function () {
        const result = await machineLearning.trainModel([1, 2, 3]);
        expect(result).to.have.property('message', 'Model training started');
    });

    it('should predict based on input data', async function () {
        const prediction = await machineLearning.predict([1, 2, 3]);
        expect(prediction).to.have.property('prediction');
    });
});
