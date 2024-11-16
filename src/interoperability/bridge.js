// bridge.js

const CrossChainProtocol = require('./cross_chain_protocol');

class Bridge {
    constructor() {
        this.protocol = new CrossChainProtocol();
    }

    registerChain(chainId, chainInstance) {
        this.protocol.registerChain(chainId, chainInstance);
    }

    async transferAssets(sourceChainId, targetChainId, assetData) {
        try {
            const transactionData = {
                asset: assetData.asset,
                amount: assetData.amount,
                from: assetData.from,
                to: assetData.to,
                timestamp: Date.now(),
            };

            const result = await this.protocol.sendTransaction(sourceChainId, targetChainId, transactionData);
            console.log("Transfer successful:", result);
        } catch (error) {
            console.error("Transfer failed:", error);
        }
    }
}

module.exports = Bridge;
