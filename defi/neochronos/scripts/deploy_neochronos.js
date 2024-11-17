const hre = require("hardhat");

async function main() {
    const Neochronos = await hre.ethers.getContractFactory("Neochronos");
    const neochronos = await Neochronos.deploy();
    await neochronos.deployed();
    console.log("Neochronos deployed to:", neochronos.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
