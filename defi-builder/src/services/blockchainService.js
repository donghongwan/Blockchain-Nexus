// src/services/blockchainService.js
import Web3 from 'web3';
import TokenContract from '../smart-contracts/Token.json';
import LiquidityPoolContract from '../smart-contracts/LiquidityPool.json';
import StakingContract from '../smart-contracts/Staking.json';
import GovernanceContract from '../smart-contracts/Governance.json';

const web3 = new Web3(window.ethereum);
const tokenContract = new web3.eth.Contract(TokenContract.abi, TokenContract.networks[5777].address);
const liquidityPoolContract = new web3.eth.Contract(LiquidityPoolContract.abi, LiquidityPoolContract.networks[5777].address);
const stakingContract = new web3.eth.Contract(StakingContract.abi, StakingContract.networks[5777].address);
const governanceContract = new web3.eth.Contract(GovernanceContract.abi, GovernanceContract.networks[5777].address);

export const createToken = async (name, symbol, totalSupply) => {
    const accounts = await web3.eth.getAccounts();
    await tokenContract.methods.createToken(name, symbol, totalSupply).send({ from: accounts[0] });
};

export const getTokenDetails = async (symbol) => {
    const details = await tokenContract.methods.getTokenDetails(symbol).call();
    return details;
};

export const addLiquidity = async (tokenA, tokenB, amountA, amountB) => {
    const accounts = await web3.eth.getAccounts();
    await liquidityPoolContract.methods.addLiquidity(tokenA, tokenB, amountA, amountB).send({ from: accounts[0] });
};

export const removeLiquidity = async (tokenA, tokenB, amountA, amountB) => {
    const accounts = await web3.eth.getAccounts();
    await liquidityPoolContract.methods.removeLiquidity(tokenA, tokenB, amountA, amountB).send({ from: accounts[0] });
};

export const stakeTokens = async (amount) => {
    const accounts = await web3.eth.getAccounts();
    await stakingContract.methods.stake(amount).send({ from: accounts[0] });
};

export const getStakedAmount = async () => {
    const accounts = await web3.eth.getAccounts();
    return await stakingContract.methods.getStakedAmount(accounts[0]).call();
};

export const getProposals = async () => {
    return await governanceContract.methods.getProposals().call();
};

export const voteOnProposal = async (proposalId) => {
    const accounts = await web3.eth.getAccounts();
    await governanceContract.methods.vote(proposalId).send({ from: accounts[0] });
};
