// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import NexGenBank from '../artifacts/contracts/NexGenBank.sol/NexGenBank.json';
import Token from '../artifacts/contracts/Token.sol/Token.json';
import Button from '../components/Button';
import TokenBalance from '../components/TokenBalance';

const Home = ({ provider, signer }) => {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState('');

    const tokenAddress = 'YOUR_TOKEN_CONTRACT_ADDRESS';
    const nexGenBankAddress = 'YOUR_NEXGENBANK_CONTRACT_ADDRESS';

    useEffect(() => {
        const fetchBalance = async () => {
            const tokenContract = new ethers.Contract(tokenAddress, Token.abi, signer);
            const balance = await tokenContract.balanceOf(await signer.getAddress());
            setBalance(ethers.utils.formatUnits(balance, 18));
        };

        fetchBalance();
    }, [signer]);

    const handleDeposit = async () => {
        const tokenContract = new ethers.Contract(tokenAddress, Token.abi, signer);
        const nexGenBankContract = new ethers.Contract(nexGenBankAddress, NexGenBank.abi, signer);
        const amountInUnits = ethers.utils.parseUnits(amount, 18);
        await tokenContract.approve(nexGenBankAddress, amountInUnits);
        await nexGenBankContract.deposit(amountInUnits);
        setAmount('');
        alert('Deposit successful!');
    };

    const handleWithdraw = async () => {
        const nexGenBankContract = new ethers.Contract(nexGenBankAddress, NexGenBank.abi, signer);
        const amountInUnits = ethers.utils.parseUnits(amount, 18);
        await nexGenBankContract.withdraw(amountInUnits);
        setAmount('');
        alert('Withdrawal successful!');
    };

    return (
        <div>
            <h1>NexGen Bank</h1>
            <TokenBalance balance={balance} />
            <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
            />
            <Button onClick={handleDeposit}>Deposit</Button>
            <Button onClick={handleWithdraw}>Withdraw</Button>
        </div>
    );
};

export default Home;
