// tools/cli/index.js

const { program } = require('commander');
const { deployContract, getContractInfo } = require('./cli');

program
    .version('1.0.0')
    .description('Blockchain Nexus CLI Tools');

// Command to deploy a contract
program
    .command('deploy <contractName>')
    .description('Deploy a smart contract')
    .action((contractName) => {
        deployContract(contractName);
    });

// Command to get contract information
program
    .command('info <contractAddress>')
    .description('Get information about a deployed contract')
    .action((contractAddress) => {
        getContractInfo(contractAddress);
    });

// Parse the command line arguments
program.parse(process.argv);
