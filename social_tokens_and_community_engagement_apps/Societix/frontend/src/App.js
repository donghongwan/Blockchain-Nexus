import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateToken from './pages/CreateToken';
import ManageTokens from './pages/ManageTokens';
import GovernancePage from './pages/GovernancePage';
import NotFound from './pages/NotFound';

const App = () => {
    const [tokens, setTokens] = useState([]);
    const [proposals, setProposals] = useState([]);

    const handleCreateToken = (name, symbol, supply) => {
        const newToken = { name, symbol, supply };
        setTokens([...tokens, newToken]);
    };

    const handleCreateProposal = (description) => {
        const newProposal = { id: proposals.length + 1, description };
        setProposals([...proposals,newProposal]);
    };

    const handleVote = (proposalId) => {
        // Logic for voting on a proposal
        console.log(`Voted on proposal with ID: ${proposalId}`);
    };

    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" render={() => <Home tokens={tokens} onCreateToken={handleCreateToken} />} />
                <Route path="/create-token" render={() => <CreateToken onCreateToken={handleCreateToken} />} />
                <Route path="/manage-tokens" render={() => <ManageTokens tokens={tokens} />} />
                <Route path="/governance" render={() => <GovernancePage proposals={proposals} onVote={handleVote} onCreateProposal={handleCreateProposal} />} />
                <Route component={NotFound} />
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;
