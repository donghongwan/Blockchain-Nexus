// services/decentralizedExchangeService.js
class DecentralizedExchangeService {
    constructor() {
        this.trades = [];
    }

    getAllTrades() {
        return this.trades;
    }

    executeTrade(fromToken, toToken, amount) {
        const newTrade = { id: this.trades.length + 1, fromToken, toToken, amount };
        this.trades.push(newTrade);
        return newTrade;
    }
}

export default new DecentralizedExchangeService();
