#!/bin/bash

# migrate.sh

# Check if the network is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <network>"
    exit 1
fi

NETWORK=$1

# Function to migrate contracts using Truffle
migrate_with_truffle() {
    echo "Migrating contracts to the $NETWORK network using Truffle..."
    truffle migrate --network $NETWORK --reset
    echo "Contracts migrated successfully."
}

# Function to migrate contracts using Hardhat
migrate_with_hardhat() {
    echo "Migrating contracts to the $NETWORK network using Hardhat..."
    npx hardhat run scripts/migrate.js --network $NETWORK
    echo "Contracts migrated successfully."
}

# Main script execution
echo "Starting migration process..."
# Check if Truffle is installed
if command -v truffle &> /dev/null; then
    migrate_with_truffle
# Check if Hardhat is installed
elif command -v hardhat &> /dev/null; then
    migrate_with_hardhat
else
    echo "Neither Truffle nor Hardhat is installed. Please install one of them."
    exit 1
fi
