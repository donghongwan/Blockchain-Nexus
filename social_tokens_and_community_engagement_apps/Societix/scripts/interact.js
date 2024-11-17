// scripts/interact.js

require('dotenv').config();
const { ethers } = require('ethers');

async function main() {
    // Connect to the Ethereum network
    const provider = new ethers.providers.InfuraProvider(process.env.REACT_APP_ETHEREUM_NETWORK, process.env.REACT_APP_INFURA_PROJECT_ID);
    
    // Create a wallet instance
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // Contract address and ABI
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const contractABI = [
        // Replace with your contract's ABI
        "function yourFunctionName(uint256 arg1) public returns (bool)",
        "event YourEventName(address indexed sender, uint256 value)"
    ];

    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    // Call a function
    const result = await contract.yourFunctionName(42); // Replace with actual function and arguments
    console.log(`Function call result: ${result}`);

    // Listen for events
    contract.on("YourEventName", (sender, value) => {
        console.log(`Event received: Sender: ${sender}, Value: ${value}`);
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
