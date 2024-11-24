const { ethers } = require("hardhat");

async function tokenizeRealEstate(realEstateAddress, tokenAmount) {
    const TokenizedRealEstate = await ethers.getContractAt("TokenizedRealEstate", realEstateAddress);
    const tx = await TokenizedRealEstate.tokenize(tokenAmount);
    await tx.wait();
    console.log("Real estate tokenized with amount:", tokenAmount);
}

// Call the function with appropriate parameters
tokenizeRealEstate("0xYourRealEstateAddress", 100);
