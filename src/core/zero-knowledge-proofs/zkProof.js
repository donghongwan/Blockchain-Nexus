const crypto = require('crypto');

class ZKProof {
    constructor() {
        this.secret = null; // The secret value to prove knowledge of
        this.publicKey = null; // The public key derived from the secret
    }

    generateKeyPair() {
        // Generate a random secret and derive the public key
        this.secret = crypto.randomBytes(32);
        this.publicKey = this.hash(this.secret);
        return this.publicKey;
    }

    hash(data) {
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    createProof(secret) {
        if (!this.publicKey) {
            throw new Error('Public key not generated.');
        }

        const r = crypto.randomBytes(32); // Random nonce
        const R = this.hash(r); // Commitment
        const challenge = this.hash(R + this.publicKey); // Challenge
        const response = this.hash(r + this.hash(secret + challenge)); // Response

        return { R, challenge, response };
    }

    verifyProof(proof) {
        const { R, challenge, response } = proof;
        const left = this.hash(response + challenge);
        const right = this.hash(R + this.publicKey);
        return left === right;
    }
}

module.exports = ZKProof;
