// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDEX {
    function trade(address tokenIn, address tokenOut, uint256 amountIn) external;
    function addLiquidity(address token, uint256 amount) external;
    function removeLiquidity(address token, uint256 amount) external;
}
