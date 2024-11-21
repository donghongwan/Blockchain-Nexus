// migrations/2_deploy_tokens.js
const Token = artifacts.require("Token");

module.exports = function (deployer) {
  const tokenName = "Advanced Token";
  const tokenSymbol = "ATK";
  
  deployer.deploy(Token, tokenName, tokenSymbol);
};
