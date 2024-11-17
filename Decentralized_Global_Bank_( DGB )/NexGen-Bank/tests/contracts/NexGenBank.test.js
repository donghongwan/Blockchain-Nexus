// tests/contracts/NexGenBank.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NexGenBank Contract", function () {
    let NexGenBank;
    let nexGenBank;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        NexGenBank = await ethers.getContractFactory("NexGenBank");
        [owner, addr1, addr2] = await ethers.getSigners();
        nexGenBank = await NexGenBank.deploy();
        await nexGenBank.deployed();
    });

    it("Should allow deposits", async function () {
        await nexGenBank.connect(addr1).deposit({ value: ethers.utils.parseEther("1") });
        const balance = await nexGenBank.getBalance(addr1.address);
        expect(balance).to.equal(ethers.utils.parseEther("1"));
    });

    it("Should allow withdrawals", async function () {
        await nexGenBank.connect(addr1).deposit({ value: ethers.utils.parseEther("1") });
        await nexGenBank.connect(addr1).withdraw(ethers.utils.parseEther("1"));
        const balance = await nexGenBank.getBalance(addr1.address);
        expect(balance).to.equal(0);
    });

    it("Should not allow withdrawals of insufficient balance", async function () {
        await expect(nexGenBank.connect(addr1).withdraw(ethers.utils.parseEther("1"))).to.be.revertedWith("Insufficient balance");
    });
});
