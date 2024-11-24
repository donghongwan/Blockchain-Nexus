const { ethers } = require("hardhat");

async function executeFlashLoan(lenderAddress, tokenAddress, amount) {
    const FlashLoanProvider = await ethers.getContractAt("FlashLoanProvider", lenderAddress);
    const tx = await FlashLoanProvider.flashLoan(tokenAddress, ethers.utils.parseUnits(amount.toString(), 18));
    await tx.wait();
    console.log(`Flash loan of ${amount} executed for token: ${tokenAddress}`);
}

// Call the function with appropriate parameters
executeFlashLoan("0xYourLenderAddress", "0xYourTokenAddress", 100);
