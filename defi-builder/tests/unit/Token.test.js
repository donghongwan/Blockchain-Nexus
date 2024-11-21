// ai/tests/unit/Token.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", function () {
    let Token;
    let token;
    let owner;
    let addr1;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("Token");
        [owner, addr1] = await ethers.getSigners();
        token = await Token.deploy("Test Token", "TTK");
        await token.deployed();
    });

    it("Should mint tokens to the owner", async function () {
        await token.mint(owner.address, 1000);
        const balance = await token.balanceOf(owner.address);
        expect(balance).to.equal(1000);
    });

    it("Should burn tokens from the owner", async function () {
        await token.mint(owner.address, 1000);
        await token.burn(500);
        const balance = await token.balanceOf(owner.address);
        expect(balance).to.equal(500);
    });

    it("Should not allow non-owner to mint tokens", async function () {
        await expect(token.connect(addr1).mint(addr1.address, 1000)).to.be.revertedWith("Ownable: caller is not the owner");
    });
});
