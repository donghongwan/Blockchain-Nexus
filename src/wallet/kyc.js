const axios = require('axios');

class KYC {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async submitKYC(userData) {
        try {
            const response = await axios.post(`${this.apiUrl}/kyc`, userData);
            return response.data;
        } catch (error) {
            console.error('KYC submission failed:', error);
            throw error;
        }
    }

    async checkKYCStatus(userId) {
        try {
            const response = await axios.get(`${this.apiUrl}/kyc/${userId}`);
            return response.data;
        } catch (error) {
            console.error('KYC status check failed:', error);
            throw error;
        }
    }
}

module.exports = KYC;
