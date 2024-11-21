// src/App.js
import React from 'react';
import TokenCreationForm from './components/TokenCreationForm';
import LiquidityPoolManager from './components/LiquidityPoolManager';
import StakingDashboard from './components/StakingDashboard';
import GovernanceVoting from './components/GovernanceVoting';
import AnalyticsDashboard from './components/AnalyticsDashboard';

const App = () => {
    return (
        <div>
            <h1>DeFi Builder</h1>
            <TokenCreationForm />
            <LiquidityPoolManager />
            <StakingDashboard />
            <GovernanceVoting />
            <AnalyticsDashboard />
        </div>
    );
};

export default App;
