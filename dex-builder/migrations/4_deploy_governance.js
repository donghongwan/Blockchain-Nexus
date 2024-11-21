// migrations/4_deploy_governance.js
const Governance = artifacts.require("Governance");

module.exports = function (deployer) {
  deployer.deploy(Governance);
};
