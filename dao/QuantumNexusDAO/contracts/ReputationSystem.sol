// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReputationSystem {
    mapping(address => uint) public reputationScores;

    event ReputationUpdated(address indexed user, uint newScore);

    function updateReputation(address user, uint score) public {
        reputationScores[user] = score;
        emit ReputationUpdated(user, score);
    }

    function getReputation(address user) public view returns (uint) {
        return reputationScores[user];
    }
}
