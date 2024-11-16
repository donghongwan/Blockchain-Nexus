class Metrics {
    constructor() {
        this.metricsData = {
            totalTransactions: 0,
            totalUsers: 0,
            averageTransactionValue: 0,
        };
    }

    incrementTransactions(value) {
        this.metricsData.totalTransactions += value;
    }

    setTotalUsers(count) {
        this.metricsData.totalUsers = count;
    }

    updateAverageTransactionValue(value) {
        const totalValue = this.metricsData.averageTransactionValue * this.metricsData.totalTransactions;
        this.metricsData.totalTransactions += 1;
        this.metricsData.averageTransactionValue = (totalValue + value) / this.metricsData.totalTransactions;
    }

    getMetrics() {
        return this.metricsData;
    }
}

module.exports = Metrics;
