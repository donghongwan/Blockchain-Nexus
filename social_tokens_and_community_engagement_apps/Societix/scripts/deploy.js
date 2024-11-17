// scripts/deploy.js

require('dotenv').config();
const { ethers } = require('ethers');
const fs = require('fs');

async function main() {
    // Connect to the Ethereum network
    const provider = new ethers.providers.InfuraProvider(process.env.REACT_APP_ETHEREUM_NETWORK, process.env.REACT_APP_INFURA_PROJECT_ID);
    
    // Create a wallet instance
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // Read the contract's ABI and bytecode
    const contractJson = JSON.parse(fs.readFileSync('./artifacts/YourContract.json', 'utf8'));
    const contractABI = contractJson.abi;
    const contractBytecode = contractJson.bytecode;

    // Create a contract factory
    const contractFactory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);

    // Deploy the contract
    console.log('Deploying contract...');
    const contract = await contractFactory.deploy(/* constructor arguments if any */);
    await contract.deployed();

    console.log(`Contract deployed at address: ${contract.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
