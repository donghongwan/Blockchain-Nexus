// interact.js
const { ethers } = require("hardhat");

async function main() {
    const [owner, user] = await ethers.getSigners();

    // Replace with your deployed contract addresses
    const tokenAddress = "YOUR_TOKEN_CONTRACT_ADDRESS";
    const nexGenBankAddress = "YOUR_NEXGENBANK_CONTRACT_ADDRESS";
    const loanAddress = "YOUR_LOAN_CONTRACT_ADDRESS";

    const Token = await ethers.getContractAt("Token", tokenAddress);
    const NexGenBank = await ethers.getContractAt("NexGenBank", nexGenBankAddress);
    const Loan = await ethers.getContractAt("Loan", loanAddress);

    // Example: User deposits tokens into NexGenBank
    const depositAmount = ethers.utils.parseUnits("100", 18); // 100 tokens
    await Token.approve(nexGenBankAddress, depositAmount);
    await NexGenBank.deposit(depositAmount);
    console.log(`Deposited ${depositAmount.toString()} tokens into NexGenBank`);

    // Example: User requests a loan
    const loanAmount = ethers.utils.parseUnits("50", 18); // 50 tokens
    const interestRate = 5; // 5%
    const duration = 30 days; // 30 days
    await Loan.requestLoan(loanAmount, interestRate, duration);
    console.log(`Loan requested for ${loanAmount.toString()} tokens`);

    // Example: User withdraws tokens from NexGenBank
    await NexGenBank.withdraw(depositAmount);
    console.log(`Withdrew ${depositAmount.toString()} tokens from NexGenBank`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
