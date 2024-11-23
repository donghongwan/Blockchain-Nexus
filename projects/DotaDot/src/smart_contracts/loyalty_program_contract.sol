// smart_contracts/loyalty_program_contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoyaltyProgram {
    struct User {
        uint256 points; // Total loyalty points earned
        uint256 lastActionTimestamp; // Last time the user earned points
    }

    mapping(address => User) public users; // Mapping of user addresses to their loyalty information
    address public admin; // Admin address for managing the program
    uint256 public pointsPerAction; // Points earned per action
    uint256 public redemptionThreshold; // Points required to redeem a reward

    event PointsEarned(address indexed user, uint256 points);
    event PointsRedeemed(address indexed user, uint256 points);
    event PointsUpdated(address indexed user, uint256 newPoints);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor(uint256 _pointsPerAction, uint256 _redemptionThreshold) {
        admin = msg.sender; // Set the contract deployer as the admin
        pointsPerAction = _pointsPerAction;
        redemptionThreshold = _redemptionThreshold;
    }

    function earnPoints() external {
        User storage user = users[msg.sender];
        require(block.timestamp > user.lastActionTimestamp + 1 days, "Can only earn points once every 24 hours");

        user.points += pointsPerAction;
        user.lastActionTimestamp = block.timestamp;

        emit PointsEarned(msg.sender, pointsPerAction);
        emit PointsUpdated(msg.sender, user.points);
    }

    function redeemPoints(uint256 _points) external {
        User storage user = users[msg.sender];
        require(user.points >= _points, "Insufficient points to redeem");
        require(_points >= redemptionThreshold, "Must redeem at least the threshold amount");

        user.points -= _points;

        emit PointsRedeemed(msg.sender, _points);
        emit PointsUpdated(msg.sender, user.points);
    }

    function getUser Points(address _user) external view returns (uint256) {
        return users[_user].points;
    }

    function updatePointsPerAction(uint256 _newPointsPerAction) external onlyAdmin {
        pointsPerAction = _newPointsPerAction;
    }

    function updateRedemptionThreshold(uint256 _newThreshold) external onlyAdmin {
        redemptionThreshold = _newThreshold;
    }
}
