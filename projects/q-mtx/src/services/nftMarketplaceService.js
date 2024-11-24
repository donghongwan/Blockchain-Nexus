// services/nftMarketplaceService.js
class NFTMarketplaceService {
    constructor() {
        this.nfts = [];
    }

    getAllNFTs() {
        return this.nfts;
    }

    createNFT(name, description, owner) {
        const newNFT = { id: this.nfts.length + 1, name, description, owner };
        this.nfts.push(newNFT);
        return newNFT;
    }

    buyNFT(id) {
        const nft = this.nfts.find(n => n.id === id);
        if (!nft) throw new Error('NFT not found');
        // Implement purchase logic here
        return { message: `NFT ${nft.name} purchased successfully` };
    }
}

export default new NFTMarketplaceService();
