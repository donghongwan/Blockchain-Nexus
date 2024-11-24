const { ethers } = require("hardhat");

async function purchaseData(marketplaceAddress, itemId) {
    const DataMarketplace = await ethers.getContractAt("DataMarketplace", marketplaceAddress);
    const tx = await DataMarketplace.purchaseData(itemId);
    await tx.wait();
    console.log("Data purchased for item ID:", itemId);
}

// Call the function with appropriate parameters
purchaseData("0xYourMarketplaceAddress", 1);
