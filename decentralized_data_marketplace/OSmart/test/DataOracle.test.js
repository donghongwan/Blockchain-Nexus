// test/DataOracle.test.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DataOracle", function () {
    let DataOracle;
    let dataOracle;
    let MockOracle;

    beforeEach(async function () {
        // Deploy a mock oracle for testing
        const MockOracleFactory = await ethers.getContractFactory("MockOracle");
        MockOracle = await MockOracleFactory.deploy();
        await MockOracle.deployed();

        // Deploy the DataOracle contract with the mock oracle address
        DataOracle = await ethers.getContractFactory("DataOracle");
        dataOracle = await DataOracle.deploy(MockOracle.address);
        await dataOracle.deployed();
    });

    it("should fetch data from the oracle", async function () {
        // Set data in the mock oracle
        await MockOracle.setData("Sample Data");

        // Fetch data from the DataOracle
        const data = await dataOracle.fetchData();
        expect(data).to.equal("Sample Data");
    });
});
