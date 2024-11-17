// test/Governance.test.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Governance", function () {
    let Governance;
    let governance;
    let owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        Governance = await ethers.getContractFactory("Governance");
        governance = await Governance.deploy();
        await governance.deployed();
    });

    it("should create a proposal", async function () {
        const proposalDescription = "Proposal to improve the platform";
        await governance.createProposal(proposalDescription);

        const proposal = await governance.proposals(0);
        expect(proposal.description).to.equal(proposalDescription);
        expect(proposal.voteCount).to.equal(0);
    });

    it("should allow users to vote on a proposal", async function () {
        const proposalDescription = "Proposal to improve the platform";
        await governance.createProposal(proposalDescription);

        await governance.vote(0);
        const proposal = await governance.proposals(0);
        expect(proposal.voteCount).to.equal(1);
    });

    it("should not allow the same user to vote twice", async function () {
        const proposalDescription = "Proposal to improve the platform";
        await governance.createProposal(proposalDescription);

        await governance.vote(0);
        await expect(governance.vote(0)).to.be.revertedWith("You have already voted");
    });
});
