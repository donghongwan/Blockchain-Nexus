import React from 'react';
import CarbonCreditForm from '../components/CarbonCreditForm';
import RenewableEnergyCreditForm from '../components/RenewableEnergyCreditForm';

const Home = ({ contract }) => {
    return (
        <div>
            <h1>Welcome to EcoGreenChain</h1>
            <CarbonCreditForm contract={contract} />
            <RenewableEnergyCreditForm contract={contract} />
        </div>
    );
};

export default Home;
