// tests/DataMarketplace.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('DataMarketplace', function () {
    let DataMarketplace;
    let dataMarketplace;

    beforeEach(async function () {
        DataMarketplace = await ethers.getContractFactory('DataMarketplace');
        dataMarketplace = await DataMarketplace.deploy();
        await dataMarketplace.deployed();
    });

    it('should list data for sale', async function () {
        const listing = await dataMarketplace.listData('Data Set 1', ethers.utils.parseEther('1'));
        expect(listing).to.have.property('message', 'Data listed for sale');
    });

    it('should allow purchasing data', async function () {
        await dataMarketplace.listData('Data Set 1', ethers.utils.parseEther('1'));
        const purchase = await dataMarketplace.purchaseData(1);
        expect(purchase).to.have.property('message', 'Data purchased successfully');
    });
});
