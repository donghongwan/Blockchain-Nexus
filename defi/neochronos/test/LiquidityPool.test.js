const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LiquidityPool", function () {
    let LiquidityPool, liquidityPool, TokenA, tokenA, TokenB, tokenB;
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        TokenA = await ethers.getContractFactory("ERC20");
        tokenA = await TokenA.deploy("Token A", "TKA", ethers.utils.parseUnits("1000", 18));
        await tokenA.deployed();

        TokenB = await ethers.getContractFactory("ERC20");
        tokenB = await TokenB.deploy("Token B", "TKB", ethers.utils.parseUnits("1000", 18));
        await tokenB.deployed();

        LiquidityPool = await ethers.getContractFactory("LiquidityPool");
        liquidityPool = await LiquidityPool.deploy(tokenA.address, tokenB.address);
        await liquidityPool.deployed();
    });

    it("Should add liquidity", async function () {
        await tokenA.approve(liquidityPool.address, ethers.utils.parseUnits("100", 18));
        await tokenB.approve(liquidityPool.address, ethers.utils.parseUnits("100", 18));

        await liquidityPool.addLiquidity(ethers.utils.parseUnits("100", 18), ethers.utils.parseUnits("100", 18));

        const poolBalanceA = await tokenA.balanceOf(liquidityPool.address);
        const poolBalanceB = await tokenB.balanceOf(liquidityPool.address);

        expect(poolBalanceA).to.equal(ethers.utils.parseUnits("100", 18));
        expect(poolBalanceB).to.equal(ethers.utils.parseUnits("100", 18));
    });

    it("Should withdraw liquidity", async function () {
        await tokenA.approve(liquidityPool.address, ethers.utils.parseUnits("100", 18));
        await tokenB.approve(liquidityPool.address, ethers.utils.parseUnits("100", 18));
        await liquidityPool.addLiquidity(ethers.utils.parseUnits("100", 18), ethers.utils.parseUnits("100", 18));

        await liquidityPool.withdrawLiquidity(ethers.utils.parseUnits("50", 18), ethers.utils.parseUnits("50", 18));

        const poolBalanceA = await tokenA.balanceOf(liquidityPool.address);
        const poolBalanceB = await tokenB.balanceOf(liquidityPool.address);

        expect(poolBalanceA).to.equal(ethers.utils.parseUnits("50", 18));
        expect(poolBalanceB).to.equal(ethers.utils.parseUnits("50", 18));
    });
});
