const InsuranceFund = artifacts.require("InsuranceFund");
const LiquidityPool = artifacts.require("LiquidityPool");
const StakingRewards = artifacts.require("StakingRewards");
const TokenizedAssets = artifacts.require("TokenizedAssets");

module.exports = async function (deployer, network, accounts) {
  try {
    // Deploy InsuranceFund contract
    await deployer.deploy(InsuranceFund);
    const insuranceFundInstance = await InsuranceFund.deployed();
    console.log("InsuranceFund deployed at:", insuranceFundInstance.address);

    // Deploy LiquidityPool contract
    await deployer.deploy(LiquidityPool, "PiCoin", "ETH", 1000); // Example parameters
    const liquidityPoolInstance = await LiquidityPool.deployed();
    console.log("LiquidityPool deployed at:", liquidityPoolInstance.address);

    // Deploy StakingRewards contract
    await deployer.deploy(StakingRewards, "PiCoin", 30); // Example parameters: token and duration
    const stakingRewardsInstance = await StakingRewards.deployed();
    console.log("StakingRewards deployed at:", stakingRewardsInstance.address);

    // Deploy TokenizedAssets contract
    await deployer.deploy(TokenizedAssets);
    const tokenizedAssetsInstance = await TokenizedAssets.deployed();
    console.log("TokenizedAssets deployed at:", tokenizedAssetsInstance.address);

    // Set initial parameters for contracts
    await liquidityPoolInstance.initializePool(insuranceFundInstance.address, stakingRewardsInstance.address);
    console.log("LiquidityPool initialized with InsuranceFund and StakingRewards addresses");

  } catch (error) {
    console.error("Error during additional migration:", error);
  }
};
