// src/identity/identityManager.js

const { ethers } = require('ethers');
const IdentityContract = require('./identityContract');
const { getProvider } = require('../utils/provider'); // Assuming you have a provider utility

class IdentityManager {
    constructor() {
        this.provider = getProvider();
        this.contract = new IdentityContract(this.provider);
    }

    async createIdentity(name, email) {
        const userId = ethers.utils.id(email); // Generate a unique ID based on email
        const identityData = { name, email, userId };

        // Store identity on the blockchain
        await this.contract.storeIdentity(userId, identityData);
        return userId;
    }

    async getIdentity(userId) {
        return await this.contract.getIdentity(userId);
    }
}

module.exports = IdentityManager;
