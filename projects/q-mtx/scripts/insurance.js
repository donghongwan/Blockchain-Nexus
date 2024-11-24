const { ethers } = require("hardhat");

async function manageInsurance(insuranceAddress, action, amount) {
    const Insurance = await ethers.getContractAt("Insurance", insuranceAddress);
    let tx;
    if (action === "deposit") {
        tx = await Insurance.deposit(amount);
    } else if (action === "withdraw") {
        tx = await Insurance.withdraw(amount);
    }
    await tx.wait();
    console.log(`${action.charAt(0).toUpperCase() + action.slice(1)} of amount:`, amount);
}

// Call the function with appropriate parameters
manageInsurance("0xYourInsuranceAddress", "deposit", ethers.utils.parseUnits("500", 18));
