// oracle.js

class Oracle {
    constructor() {
        this.priceFeeds = new Map(); // Store price feeds for assets
    }

    registerPriceFeed(asset, priceFeed) {
        this.priceFeeds.set(asset, priceFeed);
    }

    async getPrice(asset) {
        const priceFeed = this.priceFeeds.get(asset);
        if (!priceFeed) {
            throw new Error("Price feed not registered");
        }
        return await priceFeed.fetchPrice();
    }
}

module.exports = Oracle;
