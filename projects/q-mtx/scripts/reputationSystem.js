const { ethers } = require("hardhat");

async function updateReputation(reputationAddress, userAddress, score) {
    const ReputationSystem = await ethers.getContractAt("ReputationSystem", reputationAddress);
    const tx = await ReputationSystem.updateReputation(userAddress, score);
    await tx.wait();
    console.log("Reputation updated for address:", userAddress, "Score:", score);
}

// Call the function with appropriate parameters
updateReputation("0xYourReputationAddress", "0xUser Address", 10);
