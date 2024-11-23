// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InsuranceFund is Ownable {
    IERC20 public stableCoin; // The stablecoin contract
    uint256 public totalInsurance; // Total insurance amount
    mapping(address => uint256) public insuredAmounts; // Amount insured for each user

    event InsuranceFunded(address indexed user, uint256 amount);
    event InsuranceClaimed(address indexed user, uint256 amount);

    constructor(IERC20 _stableCoin) {
        stableCoin = _stableCoin;
    }

    // Function to fund insurance
    function fundInsurance(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        stableCoin.transferFrom(msg.sender, address(this), amount);
        insuredAmounts[msg.sender] += amount;
        totalInsurance += amount;
        emit InsuranceFunded(msg.sender, amount);
    }

    // Function to claim insurance
    function claimInsurance(uint256 amount) external {
        require(insuredAmounts[msg.sender] >= amount, "Insufficient insured amount");
        require(totalInsurance >= amount, "Insufficient insurance fund");

        insuredAmounts[msg.sender] -= amount;
        totalInsurance -= amount;
        stableCoin.transfer(msg.sender, amount);
        emit InsuranceClaimed(msg.sender, amount);
    }

    // Function to check the insured amount for a user
    function checkInsuredAmount() external view returns (uint256) {
        return insuredAmounts[msg.sender];
    }

    // Function to withdraw remaining funds from the insurance fund (only owner)
    function withdrawFunds(uint256 amount) external onlyOwner {
        require(totalInsurance >= amount, "Insufficient insurance fund");
        totalInsurance -= amount;
        stableCoin.transfer(msg.sender, amount);
    }
}
