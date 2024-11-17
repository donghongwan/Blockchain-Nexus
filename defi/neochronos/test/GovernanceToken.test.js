const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GovernanceToken", function () {
    let GovernanceToken, governanceToken;
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        GovernanceToken = await ethers.getContractFactory("GovernanceToken");
        governanceToken = await GovernanceToken.deploy("Governance Token", "GOV", ethers.utils.parseUnits("1000", 18));
        await governanceToken.deployed();
    });

    it("Should mint tokens", async function () {
        await governanceToken.mint(addr1.address, ethers.utils.parseUnits("100", 18));
        const balance = await governanceToken.balanceOf(addr1.address);
        expect(balance).to.equal(ethers.utils.parseUnits("100", 18));
    });

    it("Should transfer tokens", async function () {
        await governanceToken.mint(owner.address, ethers.utils.parseUnits("100", 18));
        await governanceToken.transfer(addr1.address, ethers.utils.parseUnits("50", 18));

        const balanceOwner = await governanceToken.balanceOf(owner.address);
        const balanceAddr1 = await governanceToken.balanceOf(addr1.address);

        expect(balanceOwner).to.equal(ethers.utils.parseUnits("50", 18));
        expect(balanceAddr1).to.equal(ethers.utils.parseUnits("50", 18));
    });
});
