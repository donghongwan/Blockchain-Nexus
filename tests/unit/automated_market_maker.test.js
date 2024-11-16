const LiquidityPool = require('../../src/liquidity/liquidity_pool');
const AutomatedMarketMaker = require('../../src/liquidity/automated_market_maker');

describe('AutomatedMarketMaker', () => {
    let pool;
    let amm;

    beforeEach(() => {
        pool = new LiquidityPool('ETH', 'DAI');
        pool.addLiquidity(100, 1000); // Initial liquidity
        amm = new AutomatedMarketMaker(pool);
    });

    test('should calculate price correctly', () => {
        const amountOut = amm.calculatePrice(10, 100, 1000);
        expect(amountOut).toBe(100);
    });

    test('should swap tokens', () => {
        const amountOut = amm.swap('ETH', 10);
        expect(amountOut).toBeGreaterThan(0);
        expect(pool.getReserves().ETH).toBeLessThan(100);
    });

    test('should not swap if insufficient output amount', () => {
        const amountOut = amm.swap('ETH', 1000); // Trying to swap more than available
        expect(amountOut).toBe(0);
    });
});
