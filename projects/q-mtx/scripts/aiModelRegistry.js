const { ethers } = require("hardhat");

async function registerAIModel(registryAddress, modelName, modelHash) {
    const AIModelRegistry = await ethers.getContractAt("AIModelRegistry", registryAddress);
    const tx = await AIModelRegistry.registerModel(modelName, modelHash);
    await tx.wait();
    console.log("AI model registered:", modelName);
}

// Call the function with appropriate parameters
registerAIModel("0xYourAIModelRegistryAddress", "MyAIModel", "0xModelHash");
