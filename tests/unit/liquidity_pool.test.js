const LiquidityPool = require('../../src/liquidity/liquidity_pool');

describe('LiquidityPool', () => {
    let pool;

    beforeEach(() => {
        pool = new LiquidityPool('ETH', 'DAI');
    });

    test('should add liquidity', () => {
        pool.addLiquidity(10, 100);
        expect(pool.getReserves()).toEqual({ ETH: 10, DAI: 100 });
    });

    test('should remove liquidity', () => {
        pool.addLiquidity(10, 100);
        const { amountA, amountB } = pool.removeLiquidity(10);
        expect(amountA).toBe(1);
        expect(amountB).toBe(10);
    });
});
