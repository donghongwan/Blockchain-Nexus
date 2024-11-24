// tests/DynamicNFT.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('DynamicNFT', function () {
    let DynamicNFT;
    let dynamicNFT;

    beforeEach(async function () {
        DynamicNFT = await ethers.getContractFactory('DynamicNFT');
        dynamicNFT = await DynamicNFT.deploy();
        await dynamicNFT.deployed();
    });

    it('should create a dynamic NFT', async function () {
        const nft = await dynamicNFT.createNFT('Dynamic Art', 'Description of Dynamic Art');
        expect(nft).to.have.property('name', 'Dynamic Art');
    });

    it('should update the dynamic NFT', async function () {
        await dynamicNFT.createNFT('Dynamic Art', 'Description of Dynamic Art');
        const update = await dynamicNFT.updateNFT(1, 'Updated Description');
        expect(update).to.have.property('message', 'NFT updated successfully');
    });
});
