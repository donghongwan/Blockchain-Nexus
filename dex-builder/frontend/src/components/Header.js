import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>Advanced DEX</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/trade">Trade</a></li>
                    <li><a href="/liquidity">Liquidity</a></li>
                    <li><a href="/staking">Staking</a></li>
                    <li><a href="/governance">Governance</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
