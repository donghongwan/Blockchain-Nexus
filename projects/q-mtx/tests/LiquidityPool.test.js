// tests/LiquidityPool.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('LiquidityPool', function () {
    let LiquidityPool;
    let liquidityPool;

    beforeEach(async function () {
        LiquidityPool = await ethers.getContractFactory('LiquidityPool');
        liquidityPool = await LiquidityPool.deploy();
        await liquidityPool.deployed();
    });

    it('should add liquidity to the pool', async function () {
        await liquidityPool.addLiquidity({ value: ethers.utils.parseEther('10') });
        const balance = await liquidityPool.getBalance();
        expect(balance).to.equal(ethers.utils.parseEther('10'));
    });

    it('should allow swapping tokens', async function () {
        await liquidityPool.addLiquidity({ value: ethers.utils.parseEther('10') });
        const swap = await liquidityPool.swapTokens(ethers.utils.parseEther('1'));
        expect(swap).to.have.property('message', 'Swap successful');
    });
});
