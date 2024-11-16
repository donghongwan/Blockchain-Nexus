// src/identity/index.js

const IdentityManager = require('./identityManager');
const { createIdentity, verifyIdentity } = require('./verification');

async function main() {
    const identityManager = new IdentityManager();

    // Create a new identity
    const userId = await identityManager.createIdentity('Alice', 'alice@example.com');
    console.log(`Identity created for user: ${userId}`);

    // Verify the identity
    const isVerified = await verifyIdentity(userId);
    console.log(`Is identity verified? ${isVerified}`);
}

main().catch(console.error);
