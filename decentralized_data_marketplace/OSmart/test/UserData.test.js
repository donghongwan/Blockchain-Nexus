// test/UserData.test.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserData", function () {
    let UserData;
    let userData;
    let owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        UserData = await ethers.getContractFactory("UserData");
        userData = await UserData.deploy();
        await userData.deployed();
    });

    it("should store user data correctly", async function () {
        const sampleData = "User's private data";
        await userData.storeData(sampleData);

        const retrievedData = await userData.getData();
        expect(retrievedData).to.equal(sampleData);
    });

    it("should allow multiple users to store their data", async function () {
        const [_, user1, user2] = await ethers.getSigners();
        
        await userData.connect(user1).storeData("User1's data");
        await userData.connect(user2).storeData("User2's data");

        expect(await userData.connect(user1).getData()).to.equal("User1's data");
        expect(await userData.connect(user2).getData()).to.equal("User2's data");
    });
});
