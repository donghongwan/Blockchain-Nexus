// tools/cli/cli.js

const { ethers } = require('ethers');
const { getProvider } = require('../../src/utils/provider'); // Assuming you have a provider utility

async function deployContract(contractName) {
    const provider = getProvider();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    // Load contract ABI and bytecode
    const contractArtifact = require(`../../artifacts/contracts/${contractName}.json`);
    const factory = new ethers.ContractFactory(contractArtifact.abi, contractArtifact.bytecode, wallet);

    console.log(`Deploying ${contractName}...`);
    const contract = await factory.deploy();
    await contract.deployed();
    console.log(`Contract deployed at: ${contract.address}`);
}

async function getContractInfo(contractAddress) {
    const provider = getProvider();
    const contractArtifact = require(`../../artifacts/contracts/MyContract.json`); // Replace with your contract
    const contract = new ethers.Contract(contractAddress, contractArtifact.abi, provider);

    const info = await contract.getInfo(); // Assuming your contract has a getInfo function
    console.log('Contract Info:', info);
}

module.exports = { deployContract, getContractInfo };
