// tests/MultiSigWallet.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('MultiSigWallet', function () {
    let MultiSigWallet;
    let multiSigWallet;
    let owners;

    beforeEach(async function () {
        owners = [ethers.Wallet.createRandom().address, ethers.Wallet.createRandom().address];
        MultiSigWallet = await ethers.getContractFactory('MultiSigWallet');
       multiSigWallet = await MultiSigWallet.deploy(owners, 2); // 2 required confirmations
        await multiSigWallet.deployed();
    });

    it('should allow owners to submit a transaction', async function () {
        const tx = await multiSigWallet.submitTransaction(ethers.Wallet.createRandom().address, ethers.utils.parseEther('1'), '0x');
        await tx.wait();
        const transactionCount = await multiSigWallet.getTransactionCount();
        expect(transactionCount).to.equal(1);
    });

    it('should require confirmations for a transaction', async function () {
        const tx = await multiSigWallet.submitTransaction(ethers.Wallet.createRandom().address, ethers.utils.parseEther('1'), '0x');
        await tx.wait();
        await multiSigWallet.confirmTransaction(0);
        const transaction = await multiSigWallet.transactions(0);
        expect(transaction.confirmations).to.equal(1);
    });
});
