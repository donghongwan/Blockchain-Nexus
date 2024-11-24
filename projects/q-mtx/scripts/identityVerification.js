const { ethers } = require("hardhat");

async function verifyIdentity(verificationAddress, userAddress) {
    const IdentityVerification = await ethers.getContractAt("IdentityVerification", verificationAddress);
    const tx = await IdentityVerification.verify(userAddress);
    await tx.wait();
    console.log("Identity verified for address:", userAddress);
}

// Call the function with appropriate parameters
verifyIdentity("0xYourVerificationAddress", "0xUser Address");
