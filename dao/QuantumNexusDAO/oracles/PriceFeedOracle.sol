// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PriceFeedOracle {
    struct PriceFeed {
        uint256 price;
        uint256 timestamp;
    }

    mapping(string => PriceFeed) public priceFeeds;
    address public owner;

    event PriceUpdated(string indexed asset, uint256 price, uint256 timestamp);

    constructor() {
        owner = msg.sender;
    }

    function updatePrice(string memory asset, uint256 price) public {
        require(msg.sender == owner, "Only owner can update price");
        priceFeeds[asset] = PriceFeed(price, block.timestamp);
        emit PriceUpdated(asset, price, block.timestamp);
    }

    function getPrice(string memory asset) public view returns (uint256, uint256) {
        PriceFeed memory feed = priceFeeds[asset];
        return (feed.price, feed.timestamp);
    }
}
