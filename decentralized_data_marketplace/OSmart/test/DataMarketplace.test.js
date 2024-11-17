// test/DataMarketplace.test.js

const { expect } = require("chai");

describe("DataMarketplace", function () {
    let DataMarketplace;
    let dataMarketplace;

    beforeEach(async function () {
        DataMarketplace = await ethers.getContractFactory("DataMarketplace");
        dataMarketplace = await DataMarketplace.deploy();
        await dataMarketplace.deployed();
    });

    it("should list data correctly", async function () {
        await dataMarketplace.listData("data_hash_example", ethers.utils.parseEther("0.1"));
        const listing = await dataMarketplace.listings(1);
        expect(listing.dataHash).to.equal("data_hash_example");
        expect(listing.price).to.equal(ethers.utils.parseEther("0.1"));
    });

    it("should purchase data correctly", async function () {
        await dataMarketplace.listData("data_hash_example", ethers.utils.parseEther("0.1"));
        const [buyer] = await ethers.getSigners();
        await dataMarketplace.connect(buyer).purchaseData(1, { value: ethers.utils.parseEther("0.1") });
        const listing = await dataMarketplace.listings(1);
        expect(listing.isActive).to.be.false;
    });
});
