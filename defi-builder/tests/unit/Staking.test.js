// tests/unit/Staking.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Staking Contract", function () {
    let Staking;
    let staking;
    let token;
    let owner;
    let addr1;

    beforeEach(async function () {
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy("Staking Token", "STK");
        await token.deployed();

        Staking = await ethers.getContractFactory("Staking");
        [owner, addr1] = await ethers.getSigners();
        staking = await Staking.deploy(token.address);
        await staking.deployed();
    });

    it("Should stake tokens", async function () {
        await token.mint(owner.address, 1000);
        await token.approve(staking.address, 500);
        await staking.stake(500);
        const stakedAmount = await staking.stakedAmount(owner.address);
        expect(stakedAmount).to.equal(500);
    });

    it("Should withdraw staked tokens", async function () {
        await token.mint(owner.address, 1000);
        await token.approve(staking.address, 500);
        await staking.stake(500);
        await staking.withdraw(250);
        const stakedAmount = await staking.stakedAmount(owner.address);
        expect(stakedAmount).to.equal(250);
    });

    it("Should not allow withdrawal of more tokens than staked", async function () {
        await token.mint(owner.address, 1000);
        await token.approve(staking.address, 500);
        await staking.stake(500);
        await expect(staking.withdraw(600)).to.be.revertedWith("Insufficient staked amount");
    });
});
