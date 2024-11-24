const { ethers } = require("hardhat");

async function updateDynamicNFT(nftAddress, tokenId, newData) {
    const DynamicNFT = await ethers.getContractAt("DynamicNFT", nftAddress);
    const tx = await DynamicNFT.updateData(tokenId, newData);
    await tx.wait();
    console.log(`Dynamic NFT updated: Token ID ${tokenId} with new data: ${newData}`);
}

// Call the function with appropriate parameters
updateDynamicNFT("0xYourNFTAddress", 1, "New dynamic data");
