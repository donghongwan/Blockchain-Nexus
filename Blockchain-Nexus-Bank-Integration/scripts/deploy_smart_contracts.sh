#!/bin/bash

# Set environment variables
NETWORK="development"  # Change to your desired network (e.g., mainnet, ropsten)
CONTRACT_NAME="MySmartContract"  # Change to your contract name
DEPLOYER_ADDRESS="0xYourDeployerAddress"  # Replace with your deployer address
PRIVATE_KEY="your_private_key"  # Replace with your private key

# Load environment variables from .env file if needed
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# Compile the smart contracts
echo "Compiling smart contracts..."
truffle compile

# Deploy the smart contracts
echo "Deploying $CONTRACT_NAME to $NETWORK..."
truffle migrate --network $NETWORK --reset

# Verify deployment
if [ $? -eq 0 ]; then
    echo "$CONTRACT_NAME deployed successfully to $NETWORK."
else
    echo "Deployment failed."
    exit 1
fi
