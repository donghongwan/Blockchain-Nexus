// tests/DecentralizedExchange.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('DecentralizedExchange', function () {
    let DecentralizedExchange;
    let dex;

    beforeEach(async function () {
        DecentralizedExchange = await ethers.getContractFactory('DecentralizedExchange');
        dex = await DecentralizedExchange.deploy();
        await dex.deployed();
    });

    it('should allow adding liquidity', async function () {
        await dex.addLiquidity({ value: ethers.utils.parseEther('10') });
        const balance = await dex.getLiquidity();
        expect(balance).to.equal(ethers.utils.parseEther('10'));
    });

    it('should allow swapping tokens', async function () {
        await dex.addLiquidity({ value: ethers.utils.parseEther('10') });
        const swap = await dex.swapTokens(ethers.utils.parseEther('1'));
        expect(swap).to.have.property('message', 'Swap successful');
    });
});
