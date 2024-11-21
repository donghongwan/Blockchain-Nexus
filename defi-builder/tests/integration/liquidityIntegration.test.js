// ai/tests/integration/liquidityIntegration.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Liquidity Pool Integration", function () {
    let LiquidityPool;
    let liquidityPool;
    let tokenA;
    let tokenB;
    let owner;

    beforeEach(async function () {
        const Token = await ethers.getContractFactory("Token");
        tokenA = await Token.deploy("Token A", "TKA");
        tokenB = await Token.deploy("Token B", "TKB");
        await tokenA.deployed();
        await tokenB.deployed();

        LiquidityPool = await ethers.getContractFactory("LiquidityPool");
        [owner] = await ethers.getSigners();
        liquidityPool = await LiquidityPool.deploy(tokenA.address, tokenB.address);
        await liquidityPool.deployed();
    });

    it("Should allow adding and removing liquidity", async function () {
        await tokenA.mint(owner.address, 1000);
        await tokenB.mint(owner.address, 1000);
        await tokenA.approve(liquidityPool.address, 500);
        await tokenB.approve(liquidityPool.address, 500);
        
        await liquidityPool.addLiquidity(500, 500);
        const liquidityAfterAdd = await liquidityPool.liquidity(owner.address);
        expect(liquidityAfterAdd).to.equal(1000);

        await liquidityPool.removeLiquidity(250, 250);
        const liquidityAfterRemove = await liquidityPool.liquidity(owner.address);
        expect(liquidityAfterRemove).to.equal(500);
    });
});
