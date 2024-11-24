const { ethers } = require("hardhat");

async function addLiquidity(poolAddress, tokenA, tokenB, amountA, amountB) {
    const LiquidityPool = await ethers.getContractAt("LiquidityPool", poolAddress);
    const tx = await LiquidityPool.addLiquidity(tokenA, tokenB, ethers.utils.parseUnits(amountA.toString(), 18), ethers.utils.parseUnits(amountB.toString(), 18));
    await tx.wait();
    console.log(`Liquidity added: ${amountA} of Token A and ${amountB} of Token B`);
}

// Call the function with appropriate parameters
addLiquidity("0xYourPoolAddress", "0xTokenAAddress", "0xTokenBAddress", 100, 200);
