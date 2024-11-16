const { ethers } = require("hardhat");

async function main() {
    const GalactixerToken = await ethers.getContractFactory("GalactixerToken");
    const token = await GalactixerToken.deploy(1000000); // Initial supply
    await token.deployed();

    const Galactixer = await ethers.getContractFactory("Galactixer");
    const galactixer = await Galactixer.deploy(token.address);
    await galactixer.deployed();

    console.log("Galactixer DAO deployed to:", galactixer.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
