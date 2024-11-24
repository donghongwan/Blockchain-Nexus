const { ethers } = require("hardhat");

async function createDAO(factoryAddress, name, governanceToken) {
    const DAOFactory = await ethers.getContractAt("DAOFactory", factoryAddress);
    const tx = await DAOFactory.createDAO(name, governanceToken);
    await tx.wait();
    console.log("DAO created with name:", name);
}

// Call the function with appropriate parameters
createDAO("0xYourFactoryAddress", "MyDAO", "0xYourGovernanceTokenAddress");
