// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

interface IPriceOracle {
    function getCurrentPrice() external view returns (uint256);
}

contract StableCoinManager is Ownable, Pausable {
    using SafeMath for uint256;

    IERC20 public stableCoin; // The stablecoin contract
    IPriceOracle public priceOracle; // The price oracle contract
    uint256 public targetPrice; // Target price in cents
    uint256 public adjustmentFactor; // Factor to adjust supply (in percentage)

    event SupplyAdjusted(uint256 newSupply);
    event TargetPriceUpdated(uint256 newTargetPrice);
    event AdjustmentFactorUpdated(uint256 newAdjustmentFactor);

    constructor(IERC20 _stableCoin, IPriceOracle _priceOracle, uint256 _targetPrice, uint256 _adjustmentFactor) {
        stableCoin = _stableCoin;
        priceOracle = _priceOracle;
        targetPrice = _targetPrice;
        adjustmentFactor = _adjustmentFactor;
    }

    // Function to adjust the supply of the stablecoin
    function adjustSupply() external whenNotPaused {
        uint256 currentPrice = priceOracle.getCurrentPrice();
        uint256 totalSupply = stableCoin.totalSupply();

        if (currentPrice < targetPrice) {
            // Mint new tokens if the price is below the target
            uint256 mintAmount = totalSupply.mul(adjustmentFactor).div(100);
            stableCoin.mint(address(this), mintAmount); // Mint new tokens to the manager
            emit SupplyAdjusted(totalSupply.add(mintAmount));
        } else if (currentPrice > targetPrice) {
            // Burn tokens if the price is above the target
            uint256 burnAmount = totalSupply.mul(adjustmentFactor).div(100);
            stableCoin.burn(address(this), burnAmount); // Burn tokens from the manager
            emit SupplyAdjusted(totalSupply.sub(burnAmount));
        }
    }

    // Function to update the target price
    function updateTargetPrice(uint256 _newTargetPrice) external onlyOwner {
        targetPrice = _newTargetPrice;
        emit TargetPriceUpdated(_newTargetPrice);
    }

    // Function to update the adjustment factor
    function updateAdjustmentFactor(uint256 _newAdjustmentFactor) external onlyOwner {
        adjustmentFactor = _newAdjustmentFactor;
        emit AdjustmentFactorUpdated(_newAdjustmentFactor);
    }

    // Function to pause the contract
    function pause() external onlyOwner {
        _pause();
    }

    // Function to unpause the contract
    function unpause() external onlyOwner {
        _unpause();
    }
}
