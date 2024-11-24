const { ethers } = require("hardhat");

async function claimRewards(stakingAddress, userAddress) {
    const StakingRewards = await ethers.getContractAt("StakingRewards", stakingAddress);
    const tx = await StakingRewards.claimRewards(userAddress);
    await tx.wait();
    console.log("Rewards claimed for address:", userAddress);
}

// Call the function with appropriate parameters
claimRewards("0xYourStakingAddress", "0xUser Address");
