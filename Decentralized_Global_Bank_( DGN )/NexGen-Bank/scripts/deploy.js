// deploy.js
const { ethers } = require("hardhat");

async function main() {
    // Deploy Token contract
    const Token = await ethers.getContractFactory("Token");
    const initialSupply = ethers.utils.parseUnits("1000000", 18); // 1 million tokens
    const token = await Token.deploy(initialSupply);
    await token.deployed();
    console.log("Token deployed to:", token.address);

    // Deploy Loan contract
    const Loan = await ethers.getContractFactory("Loan");
    const loanContract = await Loan.deploy(token.address);
    await loanContract.deployed();
    console.log("Loan contract deployed to:", loanContract.address);

    // Deploy Governance contract
    const Governance = await ethers.getContractFactory("Governance");
    const governanceContract = await Governance.deploy();
    await governanceContract.deployed();
    console.log("Governance contract deployed to:", governanceContract.address);

    // Deploy NexGenBank contract
    const NexGenBank = await ethers.getContractFactory("NexGenBank");
    const nexGenBank = await NexGenBank.deploy(token.address, loanContract.address, governanceContract.address);
    await nexGenBank.deployed();
    console.log("NexGenBank deployed to:", nexGenBank.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
