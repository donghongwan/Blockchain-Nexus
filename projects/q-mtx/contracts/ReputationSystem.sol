// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReputationSystem {
    mapping(address => uint256) public reputationPoints;

    event ReputationUpdated(address indexed user, uint256 newReputation);

    function increaseReputation(address _user, uint256 _points) public {
        reputationPoints[_user] += _points;
        emit ReputationUpdated(_user, reputationPoints[_user]);
    }

    function decreaseReputation(address _user, uint256 _points) public {
        require(reputationPoints[_user] >= _points, "Insufficient reputation points");
        reputationPoints[_user] -= _points;
        emit ReputationUpdated(_user, reputationPoints[_user]);
    }

    function getReputation(address _user) public view returns (uint256) {
        return reputationPoints[_user];
    }
}
