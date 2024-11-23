// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceOracle is Ownable {
    AggregatorV3Interface[] internal priceFeeds;
    uint256 public lastUpdateTime;
    uint256 public updateCooldown = 1 hours; // Cooldown period for price updates

    // Event for price updates
    event PriceUpdated(uint256 indexed price);

    constructor(address[] memory _priceFeeds) {
        for (uint256 i = 0; i < _priceFeeds.length; i++) {
            priceFeeds.push(AggregatorV3Interface(_priceFeeds[i]));
        }
    }

    // Function to get the latest price from the first feed
    function getLatestPrice() public view returns (uint256) {
        (
            , 
            int price, 
            , 
            , 
        ) = priceFeeds[0].latestRoundData();
        require(price > 0, "Invalid price");
        return uint256(price);
    }

    // Function to update the price feed address
    function updatePriceFeed(address _newPriceFeed) external onlyOwner {
        priceFeeds.push(AggregatorV3Interface(_newPriceFeed));
        emit PriceUpdated(getLatestPrice());
    }

    // Function to fetch the latest price and emit an event
    function fetchAndEmitPrice() external {
        require(block.timestamp >= lastUpdateTime + updateCooldown, "Cooldown period not met");
        uint256 latestPrice = getLatestPrice();
        lastUpdateTime = block.timestamp;
        emit PriceUpdated(latestPrice);
    }

    // Function to get the number of price feeds
    function getPriceFeedCount() external view returns (uint256) {
        return priceFeeds.length;
    }
}
