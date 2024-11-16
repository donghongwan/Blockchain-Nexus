const LiquidityManager = require('../../src/liquidity/liquidity_manager');
const LiquidityPool = require('../../src/liquidity/liquidity_pool');

describe('Liquidity Integration', () => {
    let manager;

    beforeEach(() => {
        manager = new LiquidityManager();
    });

    test('should manage liquidity across multiple pools', () => {
        const pool1 = manager.createPool('ETH', 'DAI');
        const pool2 = manager.createPool('BTC', 'USDT');

        manager.addLiquidity('ETH-DAI', 10, 100);
        manager.addLiquidity('BTC-USDT', 5, 50);

        expect(pool1.getReserves()).toEqual({ ETH: 10, DAI: 100 });
        expect(pool2.getReserves()).toEqual({ BTC: 5, USDT: 50 });
    });
});
