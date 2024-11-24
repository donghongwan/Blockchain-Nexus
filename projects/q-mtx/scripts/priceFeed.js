const { ethers } = require("hardhat");

async function updatePrice(priceFeedAddress, newPrice) {
    const PriceFeed = await ethers.getContractAt("PriceFeed", priceFeedAddress);
    const tx = await PriceFeed.updatePrice(newPrice);
    await tx.wait();
    console.log("Price updated to:", newPrice);
}

// Call the function with appropriate parameters
updatePrice("0xYourPriceFeedAddress", ethers.utils.parseUnits("100", 18));
