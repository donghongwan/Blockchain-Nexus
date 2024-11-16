// nft-example/index.js

class NFT {
    constructor(name, creator) {
        this.name = name;
        this.creator = creator;
        this.owner = creator;
        this.metadata = {};
    }

    mint(metadata) {
        this.metadata = metadata;
        console.log(`NFT minted: ${this.name} by ${this.creator}`);
    }

    transfer(newOwner) {
        this.owner = newOwner;
        console ```javascript
        console.log(`NFT ${this.name} transferred to ${newOwner}`);
    }

    getDetails() {
        return {
            name: this.name,
            creator: this.creator,
            owner: this.owner,
            metadata: this.metadata,
        };
    }
}

async function main() {
    const nft = new NFT('CryptoArt #1', 'Alice');

    // Mint the NFT
    nft.mint({ description: 'A unique piece of digital art', image: 'url_to_image' });

    // Transfer the NFT
    nft.transfer('Bob');

    console.log('NFT Details:', nft.getDetails());
}

main().catch(console.error);
