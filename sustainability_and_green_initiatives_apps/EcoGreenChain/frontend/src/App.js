import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import CarbonCredits from './pages/CarbonCredits';
import RenewableEnergyCredits from './pages/RenewableEnergyCredits';
import Governance from './pages/Governance';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/carbon-credits" component={CarbonCredits} />
                    <Route path="/renewable-energy-credits" component={RenewableEnergyCredits} />
                    <Route path="/governance" component={Governance} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
