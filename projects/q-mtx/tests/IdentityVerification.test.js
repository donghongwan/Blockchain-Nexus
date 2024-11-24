// tests/IdentityVerification.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('IdentityVerification', function () {
    let IdentityVerification;
    let identityVerification;

    beforeEach(async function () {
        IdentityVerification = await ethers.getContractFactory('IdentityVerification');
        identityVerification = await IdentityVerification.deploy();
        await identityVerification.deployed();
    });

    it('should verify an identity', async function () {
        const result = await identityVerification.verifyIdentity('userAddress', 'identityData');
        expect(result).to.have.property('verified', true);
    });
});
