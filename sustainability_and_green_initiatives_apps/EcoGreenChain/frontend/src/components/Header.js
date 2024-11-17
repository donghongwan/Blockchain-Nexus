import React from 'react';

const Header = ({ account, connectWallet }) => {
    return (
        <header>
            <h1>EcoGreenChain DApp</h1>
            {account ? (
                <p>Connected as: {account}</p>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </header>
    );
};

export default Header;
