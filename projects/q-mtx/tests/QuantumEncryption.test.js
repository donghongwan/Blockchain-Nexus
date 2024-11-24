// tests/QuantumEncryption.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('QuantumEncryption', function () {
    let QuantumEncryption;
    let quantumEncryption;

    beforeEach(async function () {
        QuantumEncryption = await ethers.getContractFactory('QuantumEncryption');
        quantumEncryption = await QuantumEncryption.deploy();
        await quantumEncryption.deployed();
    });

    it('should encrypt and decrypt data', async function () {
        const data = "Sensitive Data";
        const encryptedData = await quantumEncryption.encrypt(data);
        const decryptedData = await quantumEncryption.decrypt(encryptedData);
        expect(decryptedData).to.equal(data);
    });
});
