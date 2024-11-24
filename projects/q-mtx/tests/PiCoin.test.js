// tests/PiCoin.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('PiCoin', function () {
    let PiCoin;
    let piCoin;
    let owner;

    beforeEach(async function () {
        PiCoin = await ethers.getContractFactory('PiCoin');
        [owner] = await ethers.getSigners();
        piCoin = await PiCoin.deploy();
        await piCoin.deployed();
    });

    it('should have a total supply of 1 million', async function () {
        const totalSupply = await piCoin.totalSupply();
        expect(totalSupply).to.equal(ethers.utils.parseUnits('1000000', 18));
    });

    it('should allow transfers between accounts', async function () {
        const [addr1, addr2] = await ethers.getSigners();
        await piCoin.transfer(addr1.address, ethers.utils.parseUnits('100', 18));
        const balance = await piCoin.balanceOf(addr1.address);
        expect(balance).to.equal(ethers.utils.parseUnits('100', 18));
    });
});
