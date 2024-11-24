const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", function () {
    let token;
    let owner;
    let addr1;

    beforeEach(async function () {
        const Token = await ethers.getContractFactory("Token");
        [owner, addr1] = await ethers.getSigners();
        token = await Token.deploy("Quantum Token", "QT", 1000);
        await token.deployed();
    });

    it("should mint tokens", async function () {
        await token.mint(addr1.address, 100);
        expect(await token.balanceOf(addr1.address)).to.equal(100);
    });

    it("should burn tokens", async function () {
        await token.mint(addr1.address, 100);
        await token.connect(addr1).burn(50);
        expect(await token.balanceOf(addr1.address)).to.equal(50);
    });

    it("should transfer tokens", async function () {
        await token.mint(addr1.address, 100);
        await token.connect(addr1).transfer(owner.address, 50);
        expect(await token.balanceOf(owner.address)).to.equal(50);
    });
});
