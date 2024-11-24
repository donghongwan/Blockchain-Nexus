const { ethers } = require("hardhat");

async function tokenizeAsset(assetAddress, tokenAmount) {
    const TokenizedAssets = await ethers.getContractAt("TokenizedAssets", assetAddress);
    const tx = await TokenizedAssets.tokenize(tokenAmount);
    await tx.wait();
    console.log("Asset tokenized with amount:", tokenAmount);
}

// Call the function with appropriate parameters
tokenizeAsset("0xYourAssetAddress", 100);
