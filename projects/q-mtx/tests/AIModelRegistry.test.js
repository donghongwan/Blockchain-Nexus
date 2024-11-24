// tests/AIModelRegistry.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('AIModelRegistry', function () {
    let AIModelRegistry;
    let aiModelRegistry;

    beforeEach(async function () {
        AIModelRegistry = await ethers.getContractFactory('AIModelRegistry');
        aiModelRegistry = await AIModelRegistry.deploy();
        await aiModelRegistry.deployed();
    });

    it('should register a new AI model', async function () {
        const model = await aiModelRegistry.registerModel('Model1', 'Description of Model1');
        expect(model).to.have.property('message', 'Model registered successfully');
    });

    it('should allow fetching registered AI models', async function () {
        await aiModelRegistry.registerModel('Model1', 'Description of Model1');
        const models = await aiModelRegistry.getModels();
        expect(models.length).to.be.greaterThan(0);
    });
});
