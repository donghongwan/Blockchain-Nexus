#!/bin/bash

# deploy.sh

# Check if the network is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <network>"
    exit 1
fi

NETWORK=$1

# Function to deploy contracts using Truffle
deploy_with_truffle() {
    echo "Deploying contracts to the $NETWORK network using Truffle..."
    truffle migrate --network $NETWORK
    echo "Contracts deployed successfully."
}

# Function to deploy contracts using Hardhat
deploy_with_hardhat() {
    echo "Deploying contracts to the $NETWORK network using Hardhat..."
    npx hardhat run scripts/deploy.js --network $NETWORK
    echo "Contracts deployed successfully."
}

# Main script execution
echo "Starting deployment process..."
# Check if Truffle is installed
if command -v truffle &> /dev/null; then
    deploy_with_truffle
# Check if Hardhat is installed
elif command -v hardhat &> /dev/null; then
    deploy_with_hardhat
else
    echo "Neither Truffle nor Hardhat is installed. Please install one of them."
    exit 1
fi
