// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SocialMediaOracle {
    struct SentimentData {
        uint256 positive;
        uint256 negative;
        uint256 neutral;
        uint256 timestamp;
    }

    mapping(string => SentimentData) public sentimentData;

    event SentimentUpdated(string indexed source, uint256 positive, uint256 negative, uint256 neutral, uint256 timestamp);

    function updateSentiment(string memory source, uint256 positive, uint256 negative, uint256 neutral) public {
        sentimentData[source] = SentimentData(positive, negative, neutral, block.timestamp);
        emit SentimentUpdated(source, positive, negative, neutral, block.timestamp);
    }

    function getSentiment(string memory source) public view returns (uint256, uint256, uint256, uint256) {
        SentimentData memory data = sentimentData[source];
        return (data.positive, data.negative, data.neutral, data.timestamp);
    }
}
