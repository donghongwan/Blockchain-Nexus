const { ethers } = require("hardhat");

async function main() {
    const galactixerAddress = "YOUR_GALACTIXER_DAO_ADDRESS_HERE";
    const Galactixer = await ethers.getContractAt("Galactixer", galactixerAddress);

    // Example interaction: create a proposal
    await Galactixer.createProposal("Implement new feature X");
    console.log("Proposal created.");

    // Example interaction: vote on a proposal
    const proposalId = 1; // Example proposal ID
    await Galactixer.vote(proposalId, true);
    console.log("Voted on proposal:", proposalId);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
