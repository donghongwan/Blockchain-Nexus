// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceOracle is Ownable {
    AggregatorV3Interface internal priceFeed;

    // Event for price updates
    event PriceUpdated(uint256 indexed price);

    constructor(address _priceFeed) {
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    // Function to get the latest price
    function getLatestPrice() public view returns (uint256) {
        (
            , 
            int price, 
            , 
            , 
        ) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price");
        return uint256(price);
    }

    // Function to update the price feed address
    function updatePriceFeed(address _newPriceFeed) external onlyOwner {
        priceFeed = AggregatorV3Interface(_newPriceFeed);
        emit PriceUpdated(getLatestPrice());
 }

    // Function to fetch the latest price and emit an event
    function fetchAndEmitPrice() external {
        uint256 latestPrice = getLatestPrice();
        emit PriceUpdated(latestPrice);
    }
}
