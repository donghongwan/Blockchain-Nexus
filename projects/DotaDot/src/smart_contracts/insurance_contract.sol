// smart_contracts/insurance_contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract InsuranceContract {
    struct Policy {
        address policyholder;
        uint256 premium; // Premium amount
        uint256 coverageAmount; // Amount covered by the policy
        uint256 startTime; // Timestamp when the policy was purchased
        uint256 duration; // Duration of the policy in seconds
        bool isActive; // Policy status
        bool claimFiled; // Claim status
    }

    mapping(uint256 => Policy) public policies; // Mapping of policy ID to Policy
    uint256 public policyCount; // Total number of policies
    IERC20 public paymentToken; // Token used for premium payments

    event PolicyPurchased(uint256 policyId, address indexed policyholder, uint256 premium, uint256 coverageAmount, uint256 duration);
    event ClaimFiled(uint256 policyId, address indexed policyholder);
    event ClaimPaid(uint256 policyId, address indexed policyholder, uint256 amount);

    constructor(IERC20 _paymentToken) {
        paymentToken = _paymentToken;
    }

    function purchasePolicy(uint256 _premium, uint256 _coverageAmount, uint256 _duration) external {
        require(_premium > 0, "Premium must be greater than zero");
        require(_coverageAmount > 0, "Coverage amount must be greater than zero");
        require(_duration > 0, "Duration must be greater than zero");

        // Transfer premium payment from the policyholder to the contract
        paymentToken.transferFrom(msg.sender, address(this), _premium);

        policies[policyCount] = Policy({
            policyholder: msg.sender,
            premium: _premium,
            coverageAmount: _coverageAmount,
            startTime: block.timestamp,
            duration: _duration,
            isActive: true,
            claimFiled: false
        });

        emit PolicyPurchased(policyCount, msg.sender, _premium, _coverageAmount, _duration);
        policyCount++;
    }

    function fileClaim(uint256 _policyId) external {
        Policy storage policy = policies[_policyId];
        require(policy.policyholder == msg.sender, "Not the policyholder");
        require(policy.isActive, "Policy is not active");
        require(!policy.claimFiled, "Claim already filed");

        policy.claimFiled = true;
        emit ClaimFiled(_policyId, msg.sender);
    }

    function payClaim(uint256 _policyId) external {
        Policy storage policy = policies[_policyId];
        require(policy.policyholder == msg.sender, "Not the policyholder");
        require(policy.claimFiled, "Claim not filed");
        require(policy.isActive, "Policy is not active");
        require(block.timestamp <= policy.startTime + policy.duration, "Policy has expired");

        // Transfer the coverage amount to the policyholder
        paymentToken.transfer(msg.sender, policy.coverageAmount);
        emit ClaimPaid(_policyId, msg.sender, policy.coverageAmount);

        // Mark the policy as inactive after the claim is paid
        policy.isActive = false;
    }

    function checkPolicyStatus(uint256 _policyId) external view returns (string memory) {
        Policy storage policy = policies[_policyId];
        if (!policy.isActive) {
            return "Policy is inactive";
        } else if (block.timestamp > policy.startTime + policy.duration) {
            return "Policy has expired";
        } else {
            return "Policy is active";
        }
    }
}
