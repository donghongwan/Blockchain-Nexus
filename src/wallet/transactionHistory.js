class TransactionHistory {
    constructor() {
        this.history = [];
    }

    addTransaction(transaction) {
        this.history.push(transaction);
    }

    getHistory() {
        return this.history;
    }

    clearHistory() {
        this.history = [];
    }
}

module.exports = TransactionHistory;
