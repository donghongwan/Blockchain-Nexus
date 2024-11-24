const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Integration Tests", function () {
    let governance;
    let token;
    let staking;
    let owner;
    let addr1;

    beforeEach(async function () {
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy("Quantum Token", "QT", 1000);
        await token.deployed();

        const Governance = await ethers.getContractFactory("Governance");
        governance = await Governance.deploy();
        await governance.deployed();

        const Staking = await ethers.getContractFactory("Staking");
        staking = await Staking.deploy(token.address);
        await staking.deployed();

        [owner, addr1] = await ethers.getSigners();
    });

    it("should allow a user to stake tokens and create a proposal", async function () {
        await token.mint(addr1.address, 100);
        await token.connect(addr1).approve(staking.address, 100);
        await staking.connect(addr1).stake(100);
        
        await governance.connect(addr1).createProposal("Proposal 1", "Description of proposal 1");
        const proposal = await governance.proposals(0);
        expect(proposal.title).to.equal("Proposal 1");
    });
});
