import React, { useState } from 'react';
import web3 from '../web3';

const CarbonCreditForm = ({ contract }) => {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');

    const handleCreateCredit = async (e) => {
        e.preventDefault();
        try {
            const accounts = await web3.eth.getAccounts();
            await contract.methods.createCredit(amount).send({ from: accounts[0] });
            alert('Carbon credit created successfully!');
        } catch (error) {
            console.error(error);
            alert('Error creating carbon credit.');
        }
    };

    const handleTransferCredit = async (e) => {
        e.preventDefault();
        try {
            const accounts = await web3.eth.getAccounts();
            await contract.methods.transferCredit(1, recipient).send({ from: accounts[0] });
            alert('Carbon credit transferred successfully!');
        } catch (error) {
            console.error(error);
            alert('Error transferring carbon credit.');
        }
    };

    return (
        <div className="card">
            <h2>Carbon Credit Management</h2>
            <form onSubmit={handleCreateCredit}>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    required
                />
                <button type="submit">Create Carbon Credit</button>
            </form>
            <form onSubmit={handleTransferCredit}>
                <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Recipient Address"
                    required
                />
                <button type="submit">Transfer Carbon Credit</button>
            </form>
        </div>
    );
};

export default CarbonCreditForm;
