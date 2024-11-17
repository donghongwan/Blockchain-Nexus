// governance.js
const { ethers } = require("hardhat");

async function main() {
    const [owner, user] = await ethers.getSigners();

    // Replace with your deployed governance contract address
    const governanceAddress = "YOUR_GOVERNANCE_CONTRACT_ADDRESS";
    const Governance = await ethers.getContractAt("Governance", governanceAddress);

    // Example: Create a new proposal
    const proposalDescription = "Increase loan interest rate by 1%";
    await Governance.createProposal(proposalDescription);
    console.log(`Proposal created: "${proposalDescription}"`);

    // Example: User votes on the proposal
    const proposalId = 0; // Assuming this is the first proposal
    await Governance.vote(proposalId);
    console.log(`User  voted on proposal ID: ${proposalId}`);

    // Example: Execute the proposal if it has votes
    await Governance.executeProposal(proposalId);
    console.log(`Executed proposal ID: ${proposalId}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
