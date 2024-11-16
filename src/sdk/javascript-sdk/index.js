const Wallet = require('../wallet/wallet');
const KYC = require('../wallet/kyc');
const TransactionHistory = require('../wallet/transactionHistory');

class JavaScriptSDK {
    constructor(kycApiUrl) {
        this.wallet = new Wallet();
        this.kyc = new KYC(kycApiUrl);
        this.transactionHistory = new TransactionHistory();
    }

    createWallet() {
        return this.wallet.createWallet();
    }

    importWallet(privateKey) {
        return this.wallet.importWallet(privateKey);
    }

    async submitKYC(userData) {
        return await this.kyc.submitKYC(userData);
    }

    getTransactionHistory() {
        return this.transactionHistory.getHistory();
    }

    addTransaction(transaction) {
        this.transactionHistory.addTransaction(transaction);
    }
}

module.exports = JavaScriptSDK;
