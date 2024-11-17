// tests/contracts/Loan.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Loan Contract", function () {
    let Loan;
    let loan;
    let owner;
    let addr1;

    beforeEach(async function () {
        Loan = await ethers.getContractFactory("Loan");
        [owner, addr1] = await ethers.getSigners();
        loan = await Loan.deploy();
        await loan.deployed();
    });

    it("Should allow loan requests", async function () {
        await loan.connect(addr1).requestLoan(ethers.utils.parseEther("5"), 10);
        const loanDetails = await loan.getLoan(addr1.address);
        expect(loanDetails.amount).to.equal(ethers.utils.parseEther("5"));
        expect(loanDetails.status).to.equal(0); // Assuming 0 is 'pending'
    });

    it("Should allow loan approvals", async function () {
        await loan.connect(addr1).requestLoan(ethers.utils.parseEther("5"), 10);
        await loan.approveLoan(addr1.address);
        const loanDetails = await loan.getLoan(addr1.address);
        expect(loanDetails.status).to.equal(1); // Assuming 1 is 'approved'
    });
});
