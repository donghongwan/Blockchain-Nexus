const Migrations = artifacts.require("Migrations");
const PiCoin = artifacts.require("PiCoin");
const GovernanceToken = artifacts.require("GovernanceToken");
const PriceOracle = artifacts.require("PriceOracle");
const MultiSigWallet = artifacts.require("MultiSigWallet");

module.exports = async function (deployer, network, accounts) {
  try {
    // Deploy Migrations contract
    await deployer.deploy(Migrations);
    console.log("Migrations contract deployed at:", Migrations.address);

    // Deploy PiCoin contract
    await deployer.deploy(PiCoin, "PiCoin", "PI", 18);
    const piCoinInstance = await PiCoin.deployed();
    console.log("PiCoin deployed at:", piCoinInstance.address);

    // Deploy GovernanceToken contract
    await deployer.deploy(GovernanceToken, "GovernanceToken", "GOV", 18);
    const governanceTokenInstance = await GovernanceToken.deployed();
    console.log("GovernanceToken deployed at:", governanceTokenInstance.address);

    // Deploy PriceOracle contract
    await deployer.deploy(PriceOracle);
    const priceOracleInstance = await PriceOracle.deployed();
    console.log("PriceOracle deployed at:", priceOracleInstance.address);

    // Deploy MultiSigWallet contract
    await deployer.deploy(MultiSigWallet, [accounts[0], accounts[1], accounts[2]], 2); // 2 out of 3 signers required
    const multiSigWalletInstance = await MultiSigWallet.deployed();
    console.log("MultiSigWallet deployed at:", multiSigWalletInstance.address);

    // Set initial configurations if necessary
    await priceOracleInstance.setPiCoinAddress(piCoinInstance.address);
    console.log("PiCoin address set in PriceOracle");

  } catch (error) {
    console.error("Error during migration:", error);
  }
};
