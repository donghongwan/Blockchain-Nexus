import Web3 from 'web3';
import DEX from '../artifacts/DEX.json'; // Assuming you have the ABI

const web3 = new Web3(window.ethereum);
const dexAddress = '0xYourDexContractAddress'; // Replace with your DEX contract address

export const getDexContract = () => {
    return new web3.eth.Contract(DEX.abi, dexAddress);
};

export const tradeTokens = async (tokenIn, tokenOut, amountIn) => {
    const dexContract = getDexContract();
    const accounts = await web3.eth.getAccounts();
    await dexContract.methods.trade(tokenIn, tokenOut, amountIn).send({ from: accounts[0] });
};

export const addLiquidity = async (token, amount) => {
    const dexContract = getDexContract();
    const accounts = await web3.eth.getAccounts();
    await dexContract.methods.addLiquidity(token, amount).send({ from: accounts[0] });
};

// Additional functions for staking and governance can be added here
