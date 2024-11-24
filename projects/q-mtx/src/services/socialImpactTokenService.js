// services/socialImpactTokenService.js
class SocialImpactTokenService {
    constructor() {
        this.socialImpactTokens = [];
    }

    getAllSocialImpactTokens() {
        return this.socialImpactTokens;
    }

    createSocialImpactToken(tokenName, impactDescription) {
        const newToken = { id: this.socialImpactTokens.length + 1, tokenName, impactDescription };
        this.socialImpactTokens.push(newToken);
        return newToken;
    }
}

export default new SocialImpactTokenService();
