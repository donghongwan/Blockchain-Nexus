// tests/DeepLearning.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('DeepLearning', function () {
    let DeepLearning;
    let deepLearning;

    beforeEach(async function () {
        DeepLearning = await ethers.getContractFactory('DeepLearning');
        deepLearning = await DeepLearning.deploy();
        await deepLearning.deployed();
    });

    it('should train a deep learning model', async function () {
        const result = await deepLearning.trainModel([1, 2, 3]);
        expect(result).to.have.property('message', 'Deep learning model training started');
    });

    it('should predict based on input data', async function () {
        const prediction = await deepLearning.predict([1, 2, 3]);
        expect(prediction).to.have.property('prediction');
    });
});
