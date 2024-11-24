// tests/DAOFactory.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('DAOFactory', function () {
    let DAOFactory;
    let daoFactory;

    beforeEach(async function () {
        DAOFactory = await ethers.getContractFactory ('DAOFactory');
        daoFactory = await DAOFactory.deploy();
        await daoFactory.deployed();
    });

    it('should create a new DAO', async function () {
        const dao = await daoFactory.createDAO('MyDAO', 'Description of MyDAO');
        expect(dao).to.have.property('name', 'MyDAO');
    });

    it('should allow members to vote on proposals', async function () {
        await daoFactory.createDAO('MyDAO', 'Description of MyDAO');
        const proposal = await daoFactory.createProposal(1, 'Proposal 1');
        await daoFactory.vote(1, true);
        const votes = await daoFactory.getVotes(1);
        expect(votes).to.equal(1);
    });
});
