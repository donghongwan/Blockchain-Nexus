// tests/NFTMarketplace.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('NFTMarketplace', function () {
    let NFTMarketplace;
    let nftMarketplace;

    beforeEach(async function () {
        NFTMarketplace = await ethers.getContractFactory('NFTMarketplace');
        nftMarketplace = await NFTMarketplace.deploy();
        await nftMarketplace.deployed();
    });

    it('should create a new NFT', async function () {
        const nft = await nftMarketplace.createNFT('Art Piece', 'Description of Art Piece', 'ownerAddress');
        expect(nft).to.have.property('name', 'Art Piece');
    });

    it('should allow buying an NFT', async function () {
        await nftMarketplace.createNFT('Art Piece', 'Description of Art Piece', 'ownerAddress');
        const purchase = await nftMarketplace.buyNFT(1);
        expect(purchase).to.have.property('message', 'NFT Art Piece purchased successfully');
    });
});
