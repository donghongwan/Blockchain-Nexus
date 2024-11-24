const { ethers } = require("hardhat");

async function fractionalizeNFT(fractionalizationAddress, totalShares) {
    const NFTFractionalization = await ethers.getContractAt("NFTFractionalization", fractionalizationAddress);
    const tx = await NFTFractionalization.fractionalize(totalShares);
    await tx.wait();
    console.log("NFT fractionalized with total shares:", totalShares);
}

// Call the function with appropriate parameters
fractionalizeNFT("0xYourNFTFractionalizationAddress", 1000);
