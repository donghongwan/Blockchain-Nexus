// services/carbonCreditService.js
class CarbonCreditService {
    constructor() {
        this.carbonCredits = [];
    }

    getAllCarbonCredits() {
        return this.carbonCredits;
    }

    createCarbonCredit(projectName, creditsIssued) {
        const newCredit = { id: this.carbonCredits.length + 1, projectName, creditsIssued };
        this.carbonCredits.push(newCredit);
        return newCredit;
    }
}

export default new CarbonCreditService();
