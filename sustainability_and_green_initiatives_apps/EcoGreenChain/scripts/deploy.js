const CarbonCredit = artifacts.require("CarbonCredit");
const RenewableEnergyCredit = artifacts.require("RenewableEnergyCredit");
const EcoGreenChainGovernance = artifacts.require("EcoGreenChainGovernance");

module.exports = async function (deployer) {
    await deployer.deploy(CarbonCredit);
    await deployer.deploy(RenewableEnergyCredit);
    await deployer.deploy(EcoGreenChainGovernance);
};
