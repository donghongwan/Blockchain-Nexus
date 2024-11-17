const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("YieldFarm", function () {
    let YieldFarm, yieldFarm, Token, token;
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        Token = await ethers.getContractFactory("ERC20");
        token = await Token.deploy("Reward Token", "RWT", ethers.utils.parseUnits("1000", 18));
        await token.deployed();

        YieldFarm = await ethers.getContractFactory("YieldFarm");
        yieldFarm = await YieldFarm.deploy(token.address);
        await yieldFarm.deployed();
    });

    it("Should stake tokens", async function () {
        await token.approve(yieldFarm.address, ethers.utils.parseUnits("100", 18));
        await yieldFarm.stake(ethers.utils.parseUnits("100", 18));

        const stakedAmount = await yieldFarm.stakedAmount(owner.address);
        expect(stakedAmount).to.equal(ethers.utils.parseUnits("100", 18));
    });

    it("Should earn rewards", async function () {
        await token.approve(yieldFarm.address, ethers.utils.parseUnits("100", 18));
        await yieldFarm.stake(ethers.utils.parseUnits("100", 18));

        // Simulate time passing for rewards to accumulate
        await ethers.provider.send("evm_increaseTime", [3600]); // Increase time by 1 hour
        await ethers.provider.send("evm_mine"); // Mine a new block

        const rewards = await yieldFarm.calculateRewards(owner.address);
        expect(rewards).to.be.gt(0); // Ensure that rewards are greater than zero
    });
});
