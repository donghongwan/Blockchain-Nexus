// smart_contracts/subscription_contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Subscription {
    struct SubscriptionPlan {
        uint256 price; // Price of the subscription plan
        uint256 duration; // Duration of the subscription in seconds
    }

    struct UserSubscription {
        uint256 planId; // The ID of the subscription plan
        uint256 expiration; // Expiration timestamp of the subscription
    }

    IERC20 public token; // The token used for payments
    mapping(uint256 => SubscriptionPlan) public plans; // Mapping of plan ID to SubscriptionPlan
    mapping(address => UserSubscription) public userSubscriptions; // Mapping of user address to UserSubscription

    event SubscriptionCreated(address indexed user, uint256 planId, uint256 expiration);
    event SubscriptionRenewed(address indexed user, uint256 planId, uint256 expiration);
    event SubscriptionCancelled(address indexed user);

    constructor(IERC20 _token) {
        token = _token;
    }

    // Function to create a subscription plan
    function createPlan(uint256 _planId, uint256 _price, uint256 _duration) external {
        require(_price > 0, "Price must be greater than zero");
        require(_duration > 0, "Duration must be greater than zero");

        plans[_planId] = SubscriptionPlan({
            price: _price,
            duration: _duration
        });
    }

    // Function for users to subscribe to a plan
    function subscribe(uint256 _planId) external {
        SubscriptionPlan memory plan = plans[_planId];
        require(plan.price > 0, "Plan does not exist");

        // Transfer the subscription fee from the user to the contract
        token.transferFrom(msg.sender, address(this), plan.price);

        // Update the user's subscription
        UserSubscription storage userSub = userSubscriptions[msg.sender];
        userSub.planId = _planId;

        // Set the expiration time
        if (userSub.expiration < block.timestamp) {
            userSub.expiration = block.timestamp + plan.duration;
        } else {
            userSub.expiration += plan.duration; // Extend the subscription
        }

        emit SubscriptionCreated(msg.sender, _planId, userSub.expiration);
    }

    // Function to renew the subscription
    function renew() external {
        UserSubscription storage userSub = userSubscriptions[msg.sender];
        require(userSub.planId > 0, "No active subscription");

        SubscriptionPlan memory plan = plans[userSub.planId];

        // Transfer the subscription fee from the user to the contract
        token.transferFrom(msg.sender, address(this), plan.price);

        // Extend the expiration time
        userSub.expiration += plan.duration;

        emit SubscriptionRenewed(msg.sender, userSub.planId, userSub.expiration);
    }

    // Function to cancel the subscription
    function cancelSubscription() external {
        UserSubscription storage userSub = userSubscriptions[msg.sender];
        require(userSub.planId > 0, "No active subscription");

        delete userSubscriptions[msg.sender]; // Remove the user's subscription

        emit SubscriptionCancelled(msg.sender);
    }

    // Function to check the user's subscription status
    function getSubscriptionStatus(address _user) external view returns (uint256 planId, uint256 expiration) {
        UserSubscription storage userSub = userSubscriptions[_user];
        return (userSub.planId, userSub.expiration);
    }
}
