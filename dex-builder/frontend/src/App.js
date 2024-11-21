import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Trade from './pages/Trade';
import Liquidity from './pages/Liquidity';
import Staking from './pages/Staking';
import Governance from './pages/Governance';

const App = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/trade" component={Trade} />
                <Route path="/liquidity" component={Liquidity} />
                <Route path="/staking" component={Staking} />
                <Route path="/governance" component={Governance} />
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;
