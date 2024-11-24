const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Governance Contract", function () {
    let governance;
    let owner;
    let addr1;

    beforeEach(async function () {
        const Governance = await ethers.getContractFactory("Governance");
        [owner, addr1] = await ethers.getSigners();
        governance = await Governance.deploy();
        await governance.deployed();
    });

    it("should create a proposal", async function () {
        await governance.createProposal("Proposal 1", "Description of proposal 1");
        const proposal = await governance.proposals(0);
        expect(proposal.title).to.equal("Proposal 1");
    });

    it("should allow voting on a proposal", async function () {
        await governance.createProposal("Proposal 1", "Description of proposal 1");
        await governance.connect(addr1).vote(0, true);
        const proposal = await governance.proposals(0);
        expect(proposal.votesFor).to.equal(1);
    });

    it("should not allow voting after proposal has ended", async function () {
        await governance.createProposal("Proposal 1", "Description of proposal 1");
        await governance.connect(addr1).vote(0, true);
        await governance.endProposal(0);
        await expect(governance.connect(addr1).vote(0, true)).to.be.revertedWith("Proposal has ended");
    });
});
