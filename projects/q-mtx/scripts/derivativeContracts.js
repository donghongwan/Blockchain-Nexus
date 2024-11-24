const { ethers } = require("hardhat");

async function createDerivative(derivativeAddress, underlyingAsset, strikePrice) {
    const DerivativeContract = await ethers.getContractAt("DerivativeContract", derivativeAddress);
    const tx = await DerivativeContract.create(underlyingAsset, ethers.utils.parseUnits(strikePrice.toString(), 18));
    await tx.wait();
    console.log("Derivative contract created for asset:", underlyingAsset, "with strike price:", strikePrice);
}

// Call the function with appropriate parameters
createDerivative("0xYourDerivativeAddress", "0xUnderlyingAssetAddress", 200);
