const { ethers } = require("hardhat");

async function requestData(oracleAddress, query) {
    const AIOracle = await ethers.getContractAt("AIOracle", oracleAddress);
    const tx = await AIOracle.requestData(query);
    await tx.wait();
    console.log("Data requested from AI Oracle:", query);
}

// Call the function with appropriate parameters
requestData("0xYourOracleAddress", "Get weather data");
