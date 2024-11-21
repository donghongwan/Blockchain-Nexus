// migrations/3_deploy_dex.js
const DEX = artifacts.require("DEX");
const Token = artifacts.require("Token");

module.exports = async function (deployer) {
  const tokenInstance = await Token.deployed();
  await deployer.deploy(DEX);
  const dexInstance = await DEX.deployed();

  // Optionally, you can set the token address in the DEX contract if needed
  // await dexInstance.setTokenAddress(tokenInstance.address);
};
