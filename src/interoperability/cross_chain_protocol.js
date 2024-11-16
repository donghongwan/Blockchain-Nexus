// cross_chain_protocol.js

const crypto = require('crypto');

class CrossChainProtocol {
    constructor() {
        this.chains = new Map(); // Store registered chains
    }

    registerChain(chainId, chainInstance) {
        this.chains.set(chainId, chainInstance);
    }

    async sendTransaction(sourceChainId, targetChainId, transactionData) {
        const sourceChain = this.chains.get(sourceChainId);
        const targetChain = this.chains.get(targetChainId);

        if (!sourceChain || !targetChain) {
            throw new Error("Chain not registered");
        }

        // Validate and sign the transaction
        const signedTransaction = await sourceChain.signTransaction(transactionData);
        const transactionHash = this.hashTransaction(signedTransaction);

        // Send the transaction to the target chain
        return targetChain.receiveTransaction(signedTransaction, transactionHash);
    }

    hashTransaction(transaction) {
        return crypto.createHash('sha256').update(JSON.stringify(transaction)).digest('hex');
    }
}

module.exports = CrossChainProtocol;
