const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Interacting with Neochronos contracts using account:", deployer.address);

    // Replace with your deployed contract addresses
    const neochronosAddress = "YOUR_NEOCHRONOS_CONTRACT_ADDRESS";
    const governanceTokenAddress = "YOUR_GOVERNANCE_TOKEN_ADDRESS";
    const liquidityPoolAddress = "YOUR_LIQUIDITY_POOL_ADDRESS";

    const Neochronos = await hre.ethers.getContractAt("Neochronos", neochronosAddress);
    const GovernanceToken = await hre.ethers.getContractAt("GovernanceToken", governanceTokenAddress);
    const LiquidityPool = await hre.ethers.getContractAt("LiquidityPool", liquidityPoolAddress);

    // Example: Check Governance Token balance
    const balance = await GovernanceToken.balanceOf(deployer.address);
    console.log("Governance Token Balance:", hre.ethers.utils.formatUnits(balance, 18));

    // Example: Stake tokens in the liquidity pool
    const amountToStake = hre.ethers.utils.parseUnits("100", 18); // Adjust the amount as needed
    await GovernanceToken.approve(LiquidityPool.address, amountToStake);
    await LiquidityPool.stake(amountToStake);
    console.log("Staked", amountToStake.toString(), "tokens in the liquidity pool.");

    // Add more interactions as needed
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
