import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-light p-3">
            <h1>Societix</h1>
            <nav>
                <Link to="/">Home</Link> | 
                <Link to="/create-token"> Create Token</Link> | 
                <Link to="/manage-tokens"> Manage Tokens</Link> | 
                <Link to="/governance"> Governance</Link>
            </nav>
        </header>
    );
};

export default Header;
