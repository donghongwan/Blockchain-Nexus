// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";

contract LiquidityPool {
    Token public token;
    mapping(address => uint256) public liquidityProviders;

    event LiquidityAdded(address indexed provider, uint256 amount);
    event LiquidityRemoved(address indexed provider, uint256 amount);

    constructor(address _token) {
        token = Token(_token);
    }

    function addLiquidity(uint256 amount) external {
        token.transferFrom(msg.sender, address(this), amount);
        liquidityProviders[msg.sender] += amount;

        emit LiquidityAdded(msg.sender, amount);
    }

    function removeLiquidity(uint256 amount) external {
        require(liquidityProviders[msg.sender] >= amount, "Insufficient liquidity");
        liquidityProviders[msg.sender] -= amount;
        token.transfer(msg.sender, amount);

        emit LiquidityRemoved(msg.sender, amount);
    }
}
