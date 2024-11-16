// defi-example/index.js

const LiquidityManager = require('../../src/liquidity/liquidity_manager');
const Bridge = require('../../src/interoperability/bridge');

async function main() {
    const liquidityManager = new LiquidityManager();
    const bridge = new Bridge();

    // Create liquidity pools
    const ethDaiPool = liquidityManager.createPool('ETH', 'DAI');
    const btcUsdtPool = liquidityManager.createPool('BTC', 'USDT');

    // Add liquidity
    liquidityManager.addLiquidity('ETH-DAI', 10, 1000);
    liquidityManager.addLiquidity('BTC-USDT', 5, 500);

    console.log('Liquidity Pools Created:');
    console.log('ETH-DAI Pool:', ethDaiPool.getReserves());
    console.log('BTC-USDT Pool:', btcUsdtPool.getReserves());

    // Simulate a token swap
    const amountOut = ethDaiPool.swap('ETH', 1);
    console.log(`Swapped 1 ETH for ${amountOut} DAI`);
}

main().catch(console.error);
