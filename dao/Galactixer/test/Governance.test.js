// test/Governance.test.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Governance Contract", function () {
    let galactixer, galactixerToken, owner, addr1, addr2, addr3;

    beforeEach(async function () {
        const GalactixerToken = await ethers.getContractFactory("GalactixerToken");
        galactixerToken = await GalactixerToken.deploy(1000000);
        await galactixerToken.deployed();

        const Galactixer = await ethers.getContractFactory("Galactixer");
        galactixer = await Galactixer.deploy(galactixerToken.address);
        await galactixer.deployed();

        [owner, addr1, addr2, addr3] = await ethers.getSigners();
    });

    it("Should create a proposal", async function () {
        await galactixer.createProposal("Implement feature X");
        const proposal = await galactixer.proposals(1);
        expect(proposal.description).to.equal("Implement feature X");
    });

    it("Should allow users to vote on a proposal", async function () {
        await galactixer.createProposal("Implement feature Y");
        await galactixer.vote(1, true, { from: addr1.address });
        const proposal = await galactixer.proposals(1);
        expect(proposal.voteCount).to.equal(1);
    });

    it("Should not allow double voting", async function () {
        await galactixer.createProposal("Implement feature Z");
        await galactixer.vote(2, true, { from: addr1.address });
        await expect(galactixer.vote(2, true, { from: addr1.address })).to.be.revertedWith("Already voted");
    });

    it("Should execute a proposal if approved", async function () {
        await galactixer.createProposal("Implement feature A");
        await galactixer.vote(3, true, { from: addr1.address });
        await galactixer.vote(3, true, { from: addr2.address });
        await galactixer.vote(3, true, { from: addr3.address });

        await galactixer.executeProposal(3);
        const proposal = await galactixer.proposals(3);
        expect(proposal.executed).to.be.true;
    });

    it("Should not execute a proposal if not approved", async function () {
        await galactixer.createProposal("Implement feature B");
        await expect(galactixer.executeProposal(4)).to.be.revertedWith("Proposal not approved");
    });
});
