const crypto = require('crypto');

class Transaction {
    constructor(sender, recipient, amount, signature) {
        this.sender = sender;
        this.recipient = recipient;
        this.amount = amount;
        this.signature = signature; // Signature of the transaction
        this.timestamp = Date.now();
    }

    static signTransaction(transaction, privateKey) {
        const hash = this.calculateHash(transaction);
        const sign = crypto.createSign('SHA256');
        sign.update(hash);
        sign.end();
        const signature = sign.sign(privateKey, 'hex');
        transaction.signature = signature;
    }

    static calculateHash(transaction) {
        return crypto
            .createHash('sha256')
            .update(transaction.sender + transaction.recipient + transaction.amount + transaction.timestamp)
            .digest('hex');
    }

    validate() {
        if (!this.sender || !this.recipient || this.amount <= 0) {
            throw new Error('Invalid transaction: Sender, recipient, and amount must be valid.');
        }

        if (!this.signature) {
            throw new Error('Invalid transaction: Transaction must be signed.');
        }

        // Verify the signature
        const isValid = this.verifySignature();
        if (!isValid) {
            throw new Error('Invalid transaction: Signature verification failed.');
        }
    }

    verifySignature() {
        const publicKey = this.sender; // Assuming sender is the public key
        const hash = Transaction.calculateHash(this);
        const verify = crypto.createVerify('SHA256');
        verify.update(hash);
        verify.end();
        return verify.verify(publicKey, this.signature, 'hex');
    }
}

module.exports = { Transaction };
