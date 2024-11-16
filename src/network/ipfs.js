const IPFS = require('ipfs-core');

class IPFSIntegration {
    constructor() {
        this.ipfs = null;
    }

    async start() {
        this.ipfs = await IPFS.create();
        console.log('IPFS node is ready');
    }

    async addFile(fileContent) {
        const { cid } = await this.ipfs.add(fileContent);
        console.log(`File added with CID: ${cid}`);
        return cid;
    }

    async getFile(cid) {
        const stream = this.ipfs.cat(cid);
        let data = '';

        for await (const chunk) {
            data += chunk.toString();
        }

        console.log(`File retrieved: ${data}`);
        return data;
    }
}

module.exports = IPFSIntegration;
