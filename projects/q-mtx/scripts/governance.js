const { ethers } = require("hardhat");

async function createProposal(governanceAddress, proposalDescription) {
    const Governance = await ethers.getContractAt("Governance", governanceAddress);
    const tx = await Governance.createProposal(proposalDescription);
    await tx.wait();
    console.log("Proposal created:", proposalDescription);
}

// Call the function with appropriate parameters
createProposal("0xYourGovernanceAddress", "Increase token supply");
