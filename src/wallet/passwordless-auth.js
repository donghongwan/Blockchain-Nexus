const nodemailer = require('nodemailer');
const crypto = require('crypto');

class PasswordlessAuth {
    constructor(emailService) {
        this.emailService = emailService;
        this.tokens = new Map(); // Store tokens for verification
    }

    async sendToken(email) {
        const token = crypto.randomBytes(20).toString('hex');
        this.tokens.set(token, email);

        // Send token via email
        await this.emailService.sendEmail(email, token);
        console.log(`Token sent to ${email}`);
    }

    verifyToken(token) {
        const email = this.tokens.get(token);
        if (email) {
            this.tokens.delete(token); // Remove token after verification
            return email; // Return the associated email
        }
        throw new Error('Invalid or expired token');
    }
}

module.exports = PasswordlessAuth;
