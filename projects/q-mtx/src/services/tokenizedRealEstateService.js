// services/tokenizedRealEstateService.js
class TokenizedRealEstateService {
    constructor() {
        this.realEstateTokens = [];
    }

    getAllRealEstateTokens() {
        return this.realEstateTokens;
    }

    tokenizeRealEstate(propertyName, value) {
        const newRealEstateToken = { id: this.realEstateTokens.length + 1, propertyName, value };
        this.realEstateTokens.push(newRealEstateToken);
        return newRealEstateToken;
    }
}

export default new TokenizedRealEstateService();
