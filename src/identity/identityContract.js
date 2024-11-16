// src/identity/identityContract.js

const { ethers } = require('ethers');

class IdentityContract {
    constructor(provider) {
        this.provider = provider;
        this.contractAddress = process.env.IDENTITY_CONTRACT_ADDRESS; // Set this in your environment
        this.abi = [
            // Minimal ABI for identity management
            "function storeIdentity(bytes32 userId, string memory name, string memory email) public",
            "function getIdentity(bytes32 userId) public view returns (string memory, string memory)"
        ];
        this.contract = new ethers.Contract(this.contractAddress, this.abi, this.provider.getSigner());
    }

    async storeIdentity(userId, { name, email }) {
        const tx = await this.contract.storeIdentity(userId, name, email);
        await tx.wait();
    }

    async getIdentity(userId) {
        const [name, email] = await this.contract.getIdentity(userId);
        return { name, email, userId };
    }
}

module.exports = IdentityContract;
