// services/insuranceService.js
class InsuranceService {
    constructor() {
        this.insuranceFund = {
            totalFund: 1000000,
            claims: 0,
            available: 1000000
        };
    }

    getFundStatus() {
        return this.insuranceFund;
    }

    fileClaim(amount) {
        if (amount > this.insuranceFund.available) {
            throw new Error('Insufficient funds for claim');
        }
        this.insuranceFund.claims += amount;
        this.insuranceFund.available -= amount;
        return { message: 'Claim approved', amount };
    }
}

export default new InsuranceService();
