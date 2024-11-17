import React, { useState } from 'react';
import web3 from '../web3';

const RenewableEnergyCreditForm = ({ contract }) => {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');

    const handleCreateCredit = async (e) => {
        e.preventDefault();
        try {
            const accounts = await web3.eth.getAccounts();
            await contract.methods.createEnergyCredit(amount).send({ from: accounts[0] });
            alert('Renewable energy credit created successfully!');
        } catch (error) {
            console.error(error);
            alert('Error creating renewable energy credit.');
        }
    };

    const handleTransferCredit = async (e) => {
        e.preventDefault();
        try {
            const accounts = await web3.eth.getAccounts();
            await contract.methods.transferEnergyCredit(1, recipient).send({ from: accounts[0] });
            alert('Renewable energy credit transferred successfully!');
        } catch (error) {
            console.error(error);
            alert ('Error transferring renewable energy credit.');
        }
    };

    return (
        <div className="card">
            <h2>Renewable Energy Credit Management</h2>
            <form onSubmit={handleCreateCredit}>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    required
                />
                <button type="submit">Create Renewable Energy Credit</button>
            </form>
            <form onSubmit={handleTransferCredit}>
                <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Recipient Address"
                    required
                />
                <button type="submit">Transfer Renewable Energy Credit</button>
            </form>
        </div>
    );
};

export default RenewableEnergyCreditForm;
