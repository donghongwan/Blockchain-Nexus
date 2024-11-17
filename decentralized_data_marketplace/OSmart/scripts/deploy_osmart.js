// scripts/deploy_osmart.js

const { ethers } = require("hardhat");

async function main() {
    const DataMarketplace = await ethers.getContractFactory("DataMarketplace");
    const dataMarketplace = await DataMarketplace.deploy();
    await dataMarketplace.deployed();
    console.log("DataMarketplace deployed to:", dataMarketplace.address);

    const DataOracle = await ethers.getContractFactory("DataOracle");
    const dataOracle = await DataOracle.deploy("ORACLE_ADDRESS"); // Replace with actual oracle address
    await dataOracle.deployed();
    console.log("DataOracle deployed to:", dataOracle.address);

    const UserData = await ethers.getContractFactory("UserData");
    const userData = await UserData.deploy();
    await userData.deployed();
    console.log("UserData deployed to:", userData.address);

    const Governance = await ethers.getContractFactory("Governance");
    const governance = await Governance.deploy();
    await governance.deployed();
    console.log("Governance deployed to:", governance.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
