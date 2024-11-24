const { ethers } = require("hardhat");

async function registerIoTDevice(iotAddress, deviceId) {
    const IoTIntegration = await ethers.getContractAt("IoTIntegration", iotAddress);
    const tx = await IoT Integration.registerDevice(deviceId);
    await tx.wait();
    console.log("IoT device registered with ID:", deviceId);
}

// Call the function with appropriate parameters
registerIoTDevice("0xYourIoTIntegrationAddress", "Device123");
