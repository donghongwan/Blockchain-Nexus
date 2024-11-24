// services/stableCoinService.js
class StableCoinService {
    constructor() {
        this.fixedPrice = 314.159; // Fixed price for Pi Coin
    }

    getPrice() {
        return this.fixedPrice;
    }
}

export default new StableCoinService();
