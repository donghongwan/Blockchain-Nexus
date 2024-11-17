const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Setting up liquidity with account:", deployer.address);

    // Replace with your deployed contract addresses
    const liquidityPoolAddress = "YOUR_LIQUIDITY_POOL_ADDRESS";
    const tokenAAddress = "YOUR_TOKEN_A_ADDRESS"; // Replace with the address of Token A
    const tokenBAddress = "YOUR_TOKEN_B_ADDRESS"; // Replace with the address of Token B

    const LiquidityPool = await hre.ethers.getContractAt("LiquidityPool", liquidityPoolAddress);
    const TokenA = await hre.ethers.getContractAt("ERC20", tokenAAddress);
    const TokenB = await hre.ethers.getContractAt("ERC20", tokenBAddress);

    // Example: Add liquidity
    const amountA = hre.ethers.utils.parseUnits("100", 18); // Adjust the amount as needed
    const amountB = hre.ethers.utils.parseUnits("100", 18); // Adjust the amount as needed

    // Approve tokens for the liquidity pool
    await TokenA.approve(LiquidityPool.address, amountA);
    await TokenB.approve(LiquidityPool.address, amountB);

    // Add liquidity to the pool
    await LiquidityPool.addLiquidity(amountA, amountB);
    console.log("Added liquidity:", amountA.toString(), "of Token A and", amountB.toString(), "of Token B.");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
