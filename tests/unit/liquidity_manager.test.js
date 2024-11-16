const LiquidityManager = require('../../src/liquidity/liquidity_manager');

describe('LiquidityManager', () => {
    let manager;

    beforeEach(() => {
        manager = new LiquidityManager();
    });

    test('should create a liquidity pool', () => {
        const pool = manager.createPool('ETH', 'DAI');
        expect(manager.pools.has('ETH-DAI')).toBe(true);
        expect(pool.tokenA).toBe('ETH');
        expect(pool.tokenB).toBe('DAI');
    });

    test('should add liquidity to a pool', () => {
        const pool = manager.createPool('ETH', 'DAI');
        manager.addLiquidity('ETH-DAI', 10, 100);
        expect(pool.getReserves()).toEqual({ ETH: 10, DAI: 100 });
    });

    test('should remove liquidity from a pool', () => {
        const pool = manager.createPool('ETH', 'DAI');
        manager.addLiquidity('ETH-DAI', 10, 100);
        const { amountA, amountB } = manager.removeLiquidity('ETH-DAI', 10);
        expect(amountA).toBe(1);
        expect(amountB).toBe(10);
    });
});
