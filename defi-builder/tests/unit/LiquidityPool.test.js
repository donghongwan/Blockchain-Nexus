// tests/unit/LiquidityPool.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LiquidityPool Contract", function () {
    let LiquidityPool;
    let liquidityPool;
    let tokenA;
    let tokenB;
    let owner;
    let addr1;

    beforeEach(async function () {
        const Token = await ethers.getContractFactory("Token");
        tokenA = await Token.deploy("Token A", "TKA");
        tokenB = await Token.deploy("Token B", "TKB");
        await tokenA.deployed();
        await tokenB.deployed();

        LiquidityPool = await ethers.getContractFactory("LiquidityPool");
        [owner, addr1] = await ethers.getSigners();
        liquidityPool = await LiquidityPool.deploy(tokenA.address, tokenB.address);
        await liquidityPool.deployed();
    });

    it("Should add liquidity", async function () {
        await tokenA.mint(owner.address, 1000);
        await tokenB.mint(owner.address, 1000);
        await tokenA.approve(liquidityPool.address, 500);
        await tokenB.approve(liquidityPool.address, 500);
        
        await liquidityPool.addLiquidity(500, 500);
        const liquidity = await liquidityPool.liquidity(owner.address);
        expect(liquidity).to.equal(1000);
    });

    it("Should remove liquidity", async function () {
        await tokenA.mint(owner.address, 1000);
        await tokenB.mint(owner.address, 1000);
        await tokenA.approve(liquidityPool.address, 500);
        await tokenB.approve(liquidityPool.address, 500);
        
        await liquidityPool.addLiquidity(500, 500);
        await liquidityPool.removeLiquidity(250, 250);
        const liquidity = await liquidityPool.liquidity(owner.address);
        expect(liquidity).to.equal(500);
    });
});
