const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Neochronos", function () {
    it("Should deploy Neochronos and check initial state", async function () {
        const Neochronos = await ethers.getContractFactory("Neochronos");
        const neochronos = await Neochronos.deploy();
        await neochronos.deployed();

        expect(await neochronos.liquidityPool()).to.not.be.null;
        expect(await neochronos.yieldFarm()).to.not.be.null;
    });
});
