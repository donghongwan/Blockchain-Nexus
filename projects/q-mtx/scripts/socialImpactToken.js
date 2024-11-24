const { ethers } = require("hardhat");

async function fundSocialImpactProject(tokenAddress, projectOwner, amount) {
    const SocialImpactToken = await ethers.getContractAt("SocialImpactToken", tokenAddress);
    const tx = await SocialImpactToken.fundProject(projectOwner, ethers.utils.parseUnits(amount.toString(), 18));
    await tx.wait();
    console.log("Project funded:", projectOwner, "Amount:", amount);
}

// Call the function with appropriate parameters
fundSocialImpactProject("0xYourSocialImpactTokenAddress", "0xProjectOwnerAddress", 50);
