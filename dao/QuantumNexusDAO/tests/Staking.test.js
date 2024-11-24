const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Staking Contract", function () {
    let staking;
    let token;
    let owner;
    let addr1;

    beforeEach(async function () {
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy("Quantum Token", "QT", 1000);
        await token.deployed();

        const Staking = await ethers.getContractFactory("Staking");
        [owner, addr1] = await ethers.getSigners();
        staking = await Staking.deploy(token.address);
        await staking.deployed();
    });

    it("should allow staking tokens", async function () {
        await token.mint(addr1.address, 100);
        await token.connect(addr1).approve(staking.address, 100);
        await staking.connect(addr1).stake(100);
        expect(await staking.stakedAmount(addr1.address)).to.equal(100);
    });

    it("should calculate rewards correctly", async function () {
        await token.mint(addr1.address, 100);
        await token.connect(addr1).approve(staking.address, 100);
        await staking.connect(addr1).stake(100);
        await staking.connect(addr1).withdraw();
        expect(await token.balanceOf(addr1.address)).to.be.greaterThan(100);
    });
});
