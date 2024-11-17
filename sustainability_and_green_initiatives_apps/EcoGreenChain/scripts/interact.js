const Web3 = require('web3');
const CarbonCredit = require('./build/contracts/CarbonCredit.json');
const RenewableEnergyCredit = require('./build/contracts/RenewableEnergyCredit.json');
const EcoGreenChainGovernance = require('./build/contracts/EcoGreenChainGovernance.json');
require('dotenv').config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));
const account = process.env.ACCOUNT_ADDRESS; // Your Ethereum account address
const carbonCreditAddress = process.env.CARBON_CREDIT_ADDRESS; // Deployed CarbonCredit contract address
const renewableEnergyCreditAddress = process.env.RENEWABLE_ENERGY_CREDIT_ADDRESS; // Deployed RenewableEnergyCredit contract address
const governanceAddress = process.env.GOVERNANCE_ADDRESS; // Deployed EcoGreenChainGovernance contract address

const carbonCreditContract = new web3.eth.Contract(CarbonCredit.abi, carbonCreditAddress);
const renewableEnergyCreditContract = new web3.eth.Contract(RenewableEnergyCredit.abi, renewableEnergyCreditAddress);
const governanceContract = new web3.eth.Contract(EcoGreenChainGovernance.abi, governanceAddress);

async function createCarbonCredit(amount) {
    try {
        const result = await carbonCreditContract.methods.createCredit(amount).send({ from: account });
        console.log('Carbon Credit Created:', result);
    } catch (error) {
        console.error('Error creating carbon credit:', error);
    }
}

async function transferCarbonCredit(creditId, toAddress) {
    try {
        const result = await carbonCreditContract.methods.transferCredit(creditId, toAddress).send({ from: account });
        console.log('Carbon Credit Transferred:', result);
    } catch (error) {
        console.error('Error transferring carbon credit:', error);
    }
}

async function createRenewableEnergyCredit(amount) {
    try {
        const result = await renewableEnergyCreditContract.methods.createEnergyCredit(amount).send({ from: account });
        console.log('Renewable Energy Credit Created:', result);
    } catch (error) {
        console.error('Error creating renewable energy credit:', error);
    }
}

async function transferRenewableEnergyCredit(creditId, toAddress) {
    try {
        const result = await renewableEnergyCreditContract.methods.transferEnergyCredit(creditId, toAddress).send({ from: account });
        console.log('Renewable Energy Credit Transferred:', result);
    } catch (error) {
        console.error('Error transferring renewable energy credit:', error);
    }
}

async function createGovernanceProposal(description) {
    try {
        const result = await governanceContract.methods.createProposal(description).send({ from: account });
        console.log('Governance Proposal Created:', result);
    } catch (error) {
        console.error('Error creating governance proposal:', error);
    }
}

async function voteOnProposal(proposalId, support) {
    try {
        const result = await governanceContract.methods.vote(proposalId, support).send({ from: account });
        console.log('Voted on Proposal:', result);
    } catch (error) {
        console.error('Error voting on proposal:', error);
    }
}

async function main() {
    // Example usage
    await createCarbonCredit(100);
    await transferCarbonCredit(1, '0xRecipientAddress'); // Replace with actual recipient address
    await createRenewableEnergyCredit(50);
    await transferRenewableEnergyCredit(1, '0xRecipientAddress'); // Replace with actual recipient address
    await createGovernanceProposal('Proposal to increase carbon credit limit');
    await voteOnProposal(1, true); // Vote in favor of the proposal
}

main();
