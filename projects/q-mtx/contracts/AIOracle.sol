// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AIOracle is Ownable {
    struct DataFeed {
        string name;
        uint256 value;
        uint256 timestamp;
        uint256 confidence; // Confidence level of the data
    }

    mapping(string => DataFeed) public dataFeeds;
    string[] public dataFeedNames;

    event DataFeedUpdated(string indexed name, uint256 value, uint256 timestamp, uint256 confidence);

    // Function to update data feed
    function updateDataFeed(string memory name, uint256 value, uint256 confidence) external onlyOwner {
        require(confidence <= 100, "Confidence must be between 0 and 100");
        if (dataFeeds[name].timestamp == 0) {
            dataFeedNames.push(name);
        }
        dataFeeds[name] = DataFeed(name, value, block.timestamp, confidence);
        emit DataFeedUpdated(name, value, block.timestamp, confidence);
    }

    // Function to get data feed value
    function getDataFeed(string memory name) external view returns (uint256, uint256, uint256) {
        DataFeed memory feed = dataFeeds[name];
        return (feed.value, feed.timestamp, feed.confidence);
    }

    // Function to aggregate data from multiple feeds
    function aggregateData(string[] memory names) external view returns (uint256 averageValue) {
        uint256 totalValue = 0;
        uint256 count = 0;

        for (uint256 i = 0; i < names.length; i++) {
            if (dataFeeds[names[i]].timestamp != 0) {
                totalValue += dataFeeds[names[i]].value;
                count++;
            }
        }

        require(count > 0, "No valid data feeds provided");
        averageValue = totalValue / count;
    }
}
