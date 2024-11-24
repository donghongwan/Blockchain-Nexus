// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LiquidityPool {
    IERC20 public tokenA;
    IERC20 public tokenB;
    uint256 public totalLiquidity;

    mapping(address => uint256 public liquidity;

    event LiquidityAdded(address indexed provider, uint256 amountA, uint256 amountB);
    event LiquidityRemoved(address indexed provider, uint256 amountA, uint256 amountB);
    event Swap(address indexed user, address indexed tokenIn, address indexed tokenOut, uint256 amountIn, uint256 amountOut);

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    function addLiquidity(uint256 amountA, uint256 amountB) public {
        require(amountA > 0 && amountB > 0, "Invalid amounts");

        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);

        liquidity[msg.sender] += amountA + amountB;
        totalLiquidity += amountA + amountB;

        emit LiquidityAdded(msg.sender, amountA, amountB);
    }

    function removeLiquidity(uint256 amountA, uint256 amountB) public {
        require(liquidity[msg.sender] >= amountA + amountB, "Insufficient liquidity");

        tokenA.transfer(msg.sender, amountA);
        tokenB.transfer(msg.sender, amountB);

        liquidity[msg.sender] -= amountA + amountB;
        totalLiquidity -= amountA + amountB;

        emit LiquidityRemoved(msg.sender, amountA, amountB);
    }

    function swap(address tokenIn, uint256 amountIn) public {
        require(tokenIn == address(tokenA) || tokenIn == address(tokenB), "Invalid token");

        uint256 amountOut;
        if (tokenIn == address(tokenA)) {
            amountOut = getAmountOut(amountIn, tokenA.balanceOf(address(this)), tokenB.balanceOf(address(this)));
            tokenA.transferFrom(msg.sender, address(this), amountIn);
            tokenB.transfer(msg.sender, amountOut);
        } else {
            amountOut = getAmountOut(amountIn, tokenB.balanceOf(address(this)), tokenA.balanceOf(address(this)));
            tokenB.transferFrom(msg.sender, address(this), amountIn);
            tokenA.transfer(msg.sender, amountOut);
        }

        emit Swap(msg.sender, tokenIn, tokenIn == address(tokenA) ? address(tokenB) : address(tokenA), amountIn, amountOut);
    }

    function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) internal pure returns (uint256) {
        require(amountIn > 0, "Insufficient input amount");
        require(reserveIn > 0 && reserveOut > 0, "Insufficient liquidity");

        uint256 amountInWithFee = amountIn * 997; // 0.3% fee
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = (reserveIn * 1000) + amountInWithFee;
        return numerator / denominator;
    }
}
