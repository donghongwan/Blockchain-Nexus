// scripts/setup_data_marketplace.js

const { ethers } = require("hardhat");

async function main() {
    // Deploy the DataMarketplace contract
    const DataMarketplace = await ethers.getContractFactory("DataMarketplace");
    const dataMarketplace = await DataMarketplace.deploy();
    await dataMarketplace.deployed();
    console.log("DataMarketplace deployed to:", dataMarketplace.address);

    // Deploy the UserData contract
    const UserData = await ethers.getContractFactory("User Data");
    const userData = await UserData.deploy();
    await userData.deployed();
    console.log("User Data deployed to:", userData.address);

    // Deploy the DataOracle contract (assuming you have an oracle contract deployed)
    const DataOracle = await ethers.getContractFactory("DataOracle");
    const oracleAddress = "YOUR_ORACLE_ADDRESS"; // Replace with actual oracle address
    const dataOracle = await DataOracle.deploy(oracleAddress);
    await dataOracle.deployed();
    console.log("DataOracle deployed to:", dataOracle.address);

    // Set up initial data listings
    const initialListings = [
        { dataHash: "data_hash_1", price: ethers.utils.parseEther("0.05") },
        { dataHash: "data_hash_2", price: ethers.utils.parseEther("0.1") },
        { dataHash: "data_hash_3", price: ethers.utils.parseEther("0.15") },
    ];

    for (const listing of initialListings) {
        const tx = await dataMarketplace.listData(listing.dataHash, listing.price);
        await tx.wait();
        console.log(`Listed data: ${listing.dataHash} for ${ethers.utils.formatEther(listing.price)} ETH`);
    }

    console.log("Data marketplace setup complete.");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
