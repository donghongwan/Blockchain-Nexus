// services/tokenizedAssetsService.js
class TokenizedAssetsService {
    constructor() {
        this.tokenizedAssets = [];
    }

    getAllAssets() {
        return this.tokenizedAssets;
    }

    tokenizeAsset(assetName, value) {
        const newAsset = { id: this.tokenizedAssets.length + 1, assetName, value };
        this.tokenizedAssets.push(newAsset);
        return newAsset;
    }
}

export default new TokenizedAssetsService();
