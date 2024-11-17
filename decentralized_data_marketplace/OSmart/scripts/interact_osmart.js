// scripts/interact_osmart.js

const { ethers } = require("hardhat");

async function main() {
    const dataMarketplaceAddress = "YOUR_DATA_MARKETPLACE_ADDRESS"; // Replace with your deployed contract address
    const DataMarketplace = await ethers.getContractAt("DataMarketplace", dataMarketplaceAddress);

    // Example of listing data
    const tx = await DataMarketplace.listData("data_hash_example", ethers.utils.parseEther("0.1"));
    await tx.wait();
    console.log("Data listed successfully");

    // Example of purchasing data
    const listingId = 1; // Replace with actual listing ID
    const purchaseTx = await DataMarketplace.purchaseData(listingId, { value: ethers.utils.parseEther("0.1") });
    await purchaseTx.wait();
    console.log("Data purchased successfully");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
