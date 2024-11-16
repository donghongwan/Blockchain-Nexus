// automated_market_maker.js

class AutomatedMarketMaker {
    constructor(liquidityPool) {
        this.pool = liquidityPool;
    }

    calculatePrice(amountIn, reserveIn, reserveOut) {
        const amountOut = (amountIn * reserveOut) / (reserveIn + amountIn);
        return amountOut;
    }

    swap(tokenIn, amountIn) {
        const reserves = this.pool.getReserves();
        const tokenOut = tokenIn === this.pool.tokenA ? this.pool.tokenB : this.pool.tokenA;
        const amountOut = this.calculatePrice(amountIn, reserves[tokenIn], reserves[tokenOut]);

        if (amountOut > 0) {
            console.log(`Swapped ${amountIn} ${tokenIn} for ${amountOut} ${tokenOut}`);
            this.pool.removeLiquidity(amountOut); // Simplified for demonstration
            return amountOut;
        } else {
            console.error("Insufficient output amount");
            return 0;
        }
    }
}

module.exports = AutomatedMarketMaker;
