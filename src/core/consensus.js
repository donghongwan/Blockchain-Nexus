class Consensus {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.nodes = []; // List of nodes participating in the consensus
        this.currentView = 0; // Current view number
        this.prepared = {}; // Prepared messages for each block
        this.committed = {}; // Committed messages for each block
    }

    addNode(node) {
        if (!this.nodes.includes(node)) {
            this.nodes.push(node);
        }
    }

    // Main consensus function
    performConsensus() {
        const lastBlock = this.blockchain.getLastBlock();
        const blockToPropose = {
            index: lastBlock.index + 1,
            transactions: this.blockchain.pendingTransactions,
            previousHash: lastBlock.hash,
            timestamp: Date.now(),
        };

        // Step 1: Propose the block to all nodes
        this.proposeBlock(blockToPropose);

        // Step 2: Collect votes from nodes
        this.collectVotes(blockToPropose);
    }

    proposeBlock(block) {
        console.log(`Node proposing block: ${JSON.stringify(block)}`);
        this.sendMessageToNodes('PREPARE', block);
    }

    collectVotes(block) {
        this.prepared[block.index] = 0;

        // Simulate receiving votes from nodes
        this.nodes.forEach(node => {
            const vote = this.receiveVote(node, block);
            if (vote) {
                this.prepared[block.index]++;
            }
        });

        // If enough votes are collected, commit the block
        if (this.prepared[block.index] > this.getQuorum()) {
            this.commitBlock(block);
        }
    }

    receiveVote(node, block) {
        // Simulate a node voting for the block
        console.log(`Node ${node} voting for block: ${JSON.stringify(block)}`);
        return true; // In a real implementation, this would depend on the node's logic
    }

    commitBlock(block) {
        console.log(`Committing block: ${JSON.stringify(block)}`);
        block.hash = this.blockchain.calculateHash(block.index, block.transactions, block.previousHash);
        this.blockchain.chain.push(block);
        this.blockchain.pendingTransactions = [];
        this.committed[block.index] = true; // Mark the block as committed
    }

    getQuorum() {
        // A simple quorum calculation (e.g., 2/3 of the nodes)
        return Math.ceil(this.nodes.length * 2 / 3);
    }
}

module.exports = Consensus;
