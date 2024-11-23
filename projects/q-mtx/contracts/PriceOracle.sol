// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract PriceOracle is Ownable, Pausable {
    using SafeMath for uint256;

    uint256 private currentPrice; // Price in cents
    uint256 public lastUpdate; // Timestamp of the last price update
    uint256 public updateDelay = 1 hours; // Delay between price updates
    mapping(address => bool) public authorizedUpdaters; // Addresses authorized to update the price

    event PriceUpdated(uint256 newPrice, uint256 timestamp);
    event UpdaterAuthorized(address indexed updater);
    event UpdaterRevoked(address indexed updater);

    constructor(uint256 _initialPrice) {
        currentPrice = _initialPrice; // Set the initial price in cents
        lastUpdate = block.timestamp; // Set the initial update time
    }

    // Function to set the current price
    function setCurrentPrice(uint256 _price) external whenNotPaused {
        require(authorizedUpdaters[msg.sender] || owner() == msg.sender, "Not authorized to update price");
        require(block.timestamp >= lastUpdate + updateDelay, "Price update too soon");

        currentPrice = _price;
        lastUpdate = block.timestamp; // Update the last update time
        emit PriceUpdated(_price, lastUpdate);
    }

    // Function to get the current price
    function getCurrentPrice() external view returns (uint256) {
        return currentPrice;
    }

    // Function to authorize an address to update the price
    function authorizeUpdater(address _updater) external onlyOwner {
        authorizedUpdaters[_updater] = true;
        emit UpdaterAuthorized(_updater);
    }

    // Function to revoke an address's authorization to update the price
    function revokeUpdater(address _updater) external onlyOwner {
        authorizedUpdaters[_updater] = false;
        emit UpdaterRevoked(_updater);
    }

    // Function to pause price updates
    function pause() external onlyOwner {
        _pause();
    }

    // Function to unpause price updates
    function unpause() external onlyOwner {
        _unpause();
    }
}
