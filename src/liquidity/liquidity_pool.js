// liquidity_pool.js

class LiquidityPool {
    constructor(tokenA, tokenB) {
        this.tokenA = tokenA;
        this.tokenB = tokenB;
        this.liquidity = 0; // Total liquidity in the pool
        this.reserves = { [tokenA]: 0, [tokenB]: 0 }; // Reserves for each token
    }

    addLiquidity(amountA, amountB) {
        this.reserves[this.tokenA] += amountA;
        this.reserves[this.tokenB] += amountB;
        this.liquidity += amountA + amountB; // Simplified liquidity calculation
        console.log(`Added liquidity: ${amountA} ${this.tokenA}, ${amountB} ${this.tokenB}`);
    }

    removeLiquidity(amount) {
        // Simplified removal logic
        const amountA = (this.reserves[this.tokenA] / this.liquidity) * amount;
        const amountB = (this.reserves[this.tokenB] / this.liquidity) * amount;

        this.reserves[this.tokenA] -= amountA;
        this.reserves[this.tokenB] -= amountB;
        this.liquidity -= amount;

        console.log(`Removed liquidity: ${amountA} ${this.tokenA}, ${amountB} ${this.tokenB}`);
        return { amountA, amountB };
    }

    getReserves() {
        return this.reserves;
    }

    getLiquidity() {
       return this.liquidity;
    }
}

module.exports = LiquidityPool;
