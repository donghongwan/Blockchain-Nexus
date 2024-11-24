// services/dataMarketplaceService.js
class DataMarketplaceService {
    constructor() {
        this transactions = [];
    }

    getAllTransactions() {
        return this.transactions;
    }

    createTransaction(dataName, buyer, seller, price) {
        const newTransaction = { id: this.transactions.length + 1, dataName, buyer, seller, price };
        this.transactions.push(newTransaction);
        return newTransaction;
    }
}

export default new DataMarketplaceService();
