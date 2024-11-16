// liquidity_manager.js

const LiquidityPool = require('./liquidity_pool');

class LiquidityManager {
    constructor() {
        this.pools = new Map(); // Store liquidity pools
    }

    createPool(tokenA, tokenB) {
        const pool = new LiquidityPool(tokenA, tokenB);
        this.pools.set(`${tokenA}-${tokenB}`, pool);
        console.log(`Created liquidity pool for ${tokenA} and ${tokenB}`);
        return pool;
    }

    addLiquidity(poolKey, amountA, amountB) {
        const pool = this.pools.get(poolKey);
        if (pool) {
            pool.addLiquidity(amountA, amountB);
        } else {
            console.error("Pool not found");
        }
    }

    removeLiquidity(poolKey, amount) {
        const pool = this.pools.get(poolKey);
        if (pool) {
            return pool.removeLiquidity(amount);
        } else {
            console.error("Pool not found");
            return null;
        }
    }

    getPoolReserves(poolKey) {
        const pool = this.pools.get(poolKey);
        if (pool) {
            return pool.getReserves();
        } else {
            console.error("Pool not found");
            return null;
        }
    }

    getPoolLiquidity(poolKey) {
        const pool = this.pools.get(poolKey);
        if (pool) {
            return pool.getLiquidity();
        } else {
            console.error("Pool not found");
            return null;
        }
    }
}

module.exports = LiquidityManager;
