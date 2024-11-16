// test/MultiSigWallet.test.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiSigWallet Contract", function () {
    let multiSigWallet, owner, addr1, addr2, addr3;

    beforeEach(async function () {
        [owner, addr1, addr2, addr3] = await ethers.getSigners();
        const owners = [owner.address, addr1.address, addr2.address];
        const required = 2;

        const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
        multiSigWallet = await MultiSigWallet.deploy(owners, required);
        await multiSigWallet.deployed();
    });

    it("Should create a transaction", async function () {
        await multiSigWallet.createTransaction(addr3.address, ethers.utils.parseEther("1.0"), "0x");
        const transaction = await multiSigWallet.transactions(0);
        expect(transaction.to).to.equal(addr3.address);
        expect(transaction.value.toString()).to.equal(ethers.utils.parseEther("1.0").toString());
    });

    it("Should approve a transaction", async function () {
        await multiSigWallet.createTransaction(addr3.address, ethers.utils.parseEther("1.0"), "0x");
        await multiSigWallet.approveTransaction(0);
        const transaction = await multiSigWallet.transactions(0);
        expect(transaction.approvals).to.equal(1);
    });

    it("Should execute a transaction when enough approvals are given", async function () {
        await multiSigWallet.createTransaction(addr3.address, ethers.utils.parseEther("1.0"), "0x");
        await multiSigWallet.approveTransaction(0);
        await multiSigWallet.connect(addr1).approveTransaction(0); // addr1 approves
        await multiSigWallet.connect(addr2).approveTransaction(0); // addr2 approves

        await expect(multiSigWallet.executeTransaction(0)).to.not.be.reverted;
        const transaction = await multiSigWallet.transactions(0);
        expect(transaction.executed).to.be.true;
    });

    it("Should not execute a transaction if not enough approvals", async function () {
        await multiSigWallet.createTransaction(addr3.address, ethers.utils.parseEther("1.0"), "0x");
        await multiSigWallet.approveTransaction(0);
        await expect(multiSigWallet.executeTransaction(0)).to.be.revertedWith("Not enough approvals");
    });

    it("Should revert if a non-owner tries to approve a transaction", async function () {
        await multiSigWallet.createTransaction(addr3.address, ethers.utils.parseEther("1.0"), "0x");
        await expect(multiSigWallet.connect(addr3).approveTransaction(0)).to.be.revertedWith("Not an owner");
    });
});
