#!/bin/bash

# setup.sh

# Function to install Node.js
install_node() {
    echo "Installing Node.js..."
    if command -v node &> /dev/null; then
        echo "Node.js is already installed."
    else
        curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
        sudo apt-get install -y nodejs
        echo "Node.js installed successfully."
    fi
}

# Function to install npm packages
install_npm_packages() {
    echo "Installing npm packages..."
    npm install
    echo "npm packages installed successfully."
}

# Function to install additional tools (e.g., Truffle, Hardhat)
install_tools() {
    echo "Installing Truffle and Hardhat..."
    npm install -g truffle hardhat
    echo "Truffle and Hardhat installed successfully."
}

# Main script execution
echo "Setting up the development environment..."
install_node
install_npm_packages
install_tools
echo "Development environment setup complete."
