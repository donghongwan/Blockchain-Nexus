const { ethers } = require("hardhat");

async function listNFT(marketplaceAddress, nftAddress, tokenId, price) {
    const Marketplace = await ethers.getContractAt("NFTMarketplace", marketplaceAddress);
    const tx = await Marketplace.listNFT(nftAddress, tokenId, ethers.utils .parseUnits(price.toString(), 18));
    await tx.wait();
    console.log(`NFT listed: ${nftAddress} (Token ID: ${tokenId}) for price: ${price}`);
}

// Call the function with appropriate parameters
listNFT("0xYourMarketplaceAddress", "0xYourNFTAddress", 1, 0.5);
