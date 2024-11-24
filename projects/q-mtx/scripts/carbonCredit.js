const { ethers } = require("hardhat");

async function issueCarbonCredits(carbonCreditAddress, recipient, amount) {
    const CarbonCredit = await ethers.getContractAt("CarbonCredit", carbonCreditAddress);
    const tx = await CarbonCredit.issueCredits(recipient, ethers.utils.parseUnits(amount.toString(), 18));
    await tx.wait();
    console.log("Carbon credits issued to:", recipient, "Amount:", amount);
}

// Call the function with appropriate parameters
issueCarbonCredits("0xYourCarbonCreditAddress", "0xRecipientAddress", 100);
