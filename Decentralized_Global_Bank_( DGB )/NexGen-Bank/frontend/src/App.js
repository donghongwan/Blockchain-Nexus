// src/App.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Home from './pages/Home';
import './styles.css';

const App = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                setProvider(provider);
                setSigner(signer);
            } else {
                alert('Please install MetaMask!');
            }
        };

        init();
    }, []);

    return (
        <div className="App">
            {signer ? <Home provider={provider} signer={signer} /> : <h2>Loading...</h2>}
        </div>
    );
};

export default App;
