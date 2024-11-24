// services/dynamicNFTService.js
class DynamicNFTService {
    constructor() {
        this.dynamicNFTs = [];
    }

    getAllDynamicNFTs() {
        return this.dynamicNFTs;
    }

    createDynamicNFT(name, attributes) {
        const newDynamicNFT = { id: this.dynamicNFTs.length + 1, name, attributes };
        this.dynamicNFTs.push(newDynamicNFT);
        return newDynamicNFT;
    }
}

export default new DynamicNFTService();
