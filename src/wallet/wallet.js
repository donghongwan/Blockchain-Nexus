const ethers = require('ethers');

class Wallet {
    constructor() {
        this.wallet = null;
    }

    createWallet() {
        this.wallet = ethers.Wallet.createRandom();
        console.log(`Wallet created: ${this.wallet.address}`);
        return this.wallet;
    }

    importWallet(privateKey) {
        this.wallet = new ethers.Wallet(privateKey);
        console.log(`Wallet imported: ${this.wallet.address}`);
        return this.wallet;
    }

    getBalance(provider) {
        return provider.getBalance(this.wallet.address).then((balance) => {
            return ethers.utils.formatEther(balance);
        });
    }

    signTransaction(transaction) {
        return this.wallet.signTransaction(transaction);
    }
}

module.exports = Wallet;
