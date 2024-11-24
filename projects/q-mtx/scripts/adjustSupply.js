const { ethers } = require("hardhat");

async function adjustSupply(tokenAddress, amount) {
    const Token = await ethers.getContractAt("YourToken", tokenAddress);
    const tx = await Token.adjustSupply(amount);
    await tx.wait();
    console.log("Supply adjusted by:", amount);
}

// Call the function with appropriate parameters
adjustSupply("0xYourTokenAddress", ethers.utils.parseUnits("1000", 18));
