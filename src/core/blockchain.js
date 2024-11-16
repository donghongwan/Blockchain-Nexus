const { Transaction } = require('./transaction');
const { Consensus } = require('./consensus');
const crypto = require('crypto');

class Blockchain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];
        this.eventLog = [];
        this.createGenesisBlock();
        this.consensus = new Consensus(this);
    }

    createGenesisBlock() {
        const genesisBlock = {
            index: 0,
            timestamp: Date.now(),
            transactions: [],
            previousHash: '0',
            hash: this.calculateHash(0, [], '0'),
        };
        this.chain.push(genesisBlock);
    }

    calculateHash(index, transactions, previousHash) {
        return crypto
            .createHash('sha256')
            .update(index + JSON.stringify(transactions) + previousHash)
            .digest('hex');
    }

    createTransaction(sender, recipient, amount, signature) {
        const transaction = new Transaction(sender, recipient, amount, signature);
        transaction.validate();
        this.pendingTransactions.push(transaction);
        this.logEvent(`Transaction created: ${JSON.stringify(transaction)}`);
        return this.getLastBlock().index + 1; // Return the next block index
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(minerAddress) {
        if (this.pendingTransactions.length === 0) {
            throw new Error('No transactions to mine');
        }

        const block = {
            index: this.chain.length,
            timestamp: Date.now(),
            transactions: this.pendingTransactions,
            previousHash: this.getLastBlock().hash,
            hash: this.calculateHash(this.chain.length, this.pendingTransactions, this.getLastBlock().hash),
        };

        this.chain.push(block);
        this.pendingTransactions = [];
        this.consensus.performConsensus(); // Call consensus algorithm after mining
        this.logEvent(`Block mined: ${JSON.stringify(block)}`);
        return block;
    }

    logEvent(event) {
        this.eventLog.push({ timestamp: Date.now(), event });
    }

    validateChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Check if the hash is correct
            if (currentBlock.hash !== this.calculateHash(currentBlock.index, currentBlock.transactions, previousBlock.hash)) {
                return false;
            }

            // Check if the previous hash is correct
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    getChain() {
        return this.chain;
    }

    getEventLog() {
        return this.eventLog;
    }

    getPendingTransactions() {
        return this.pendingTransactions;
    }

    // Smart contract execution placeholder
    executeSmartContract(contractCode, params) {
        // This is a placeholder for executing smart contracts
        // In a real implementation, you would use a VM (like Ethereum's EVM) to execute the contract
        console.log(`Executing smart contract: ${contractCode} with params: ${JSON.stringify(params)}`);
        // Return a mock result
        return { success: true, result: 'Contract executed successfully' };
    }
}

module.exports = Blockchain;
