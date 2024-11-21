// ai/tests/integration/governanceIntegration.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Governance Integration", function () {
    let Governance;
    let governance;
    let token;
    let owner;
    let addr1;

    beforeEach(async function () {
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy("Governance Token", "GOV");
        await token.deployed();

        Governance = await ethers.getContractFactory("Governance");
        [owner, addr1] = await ethers.getSigners();
        governance = await Governance.deploy(token.address);
        await governance.deployed();
    });

    it("Should allow proposal creation and voting", async function () {
        await governance.createProposal("Increase rewards", 100);
        const proposal = await governance.proposals(0);
        expect(proposal.description).to.equal("Increase rewards");

        await token.mint(addr1.address, 1000);
        await token.connect(addr1).approve(governance.address, 1000);
        await governance.connect(addr1).vote(0, true);
        const proposalAfterVote = await governance.proposals(0);
        expect(proposalAfterVote.voteCount).to.equal(1);
    });
});
