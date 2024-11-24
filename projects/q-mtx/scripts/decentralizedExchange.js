const { ethers } = require("hardhat");

async function swapTokens(exchangeAddress, tokenA, tokenB, amount) {
    const DEX = await ethers.getContractAt("DecentralizedExchange", exchangeAddress);
    const tx = await DEX.swap(tokenA, tokenB, ethers.utils.parseUnits(amount.toString(), 18));
    await tx.wait();
    console.log(`Swapped ${amount} of Token A for Token B`);
}

// Call the function with appropriate parameters
swapTokens("0xYourExchangeAddress", "0xTokenAAddress", "0xTokenBAddress", 50);
