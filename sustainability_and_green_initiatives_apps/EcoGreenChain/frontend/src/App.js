import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Governance from './pages/Governance';
import web3 from './web3';
import CarbonCredit from './build/contracts/CarbonCredit.json';

const App = () => {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);

    const connectWallet = async () => {
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
    };

    useEffect(() => {
        const loadContract = async () => {
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = CarbonCredit.networks[networkId];
            const instance = new web3.eth.Contract(
                CarbonCredit.abi,
                deployedNetwork && deployedNetwork.address,
            );
            setContract(instance);
        };
        loadContract();
    }, []);

    return (
        <Router>
            <Header account={account} connectWallet={connectWallet} />
            <Switch>
                <Route path="/" exact>
                    <Home contract={contract} />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path="/governance">
                    <Governance />
                </Route>
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;
