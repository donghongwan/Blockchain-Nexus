// tests/Governance.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Governance', function () {
    let Governance;
    let governance;

    beforeEach(async function () {
        Governance = await ethers.getContractFactory('Governance');
        governance = await Governance.deploy();
        await governance.deployed();
    });

    it('should create a new proposal', async function () {
        await governance.createProposal('Proposal 1', 'Description of Proposal 1');
        const proposals = await governance.getProposals();
        expect(proposals.length).to.equal(1);
        expect(proposals[0].title).to.equal('Proposal 1');
    });
});
