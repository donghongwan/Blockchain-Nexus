// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RenewableEnergyCredit is Ownable {
    struct EnergyCredit {
        uint256 id;
        address owner;
        uint256 amount;
        bool isActive;
    }

    mapping(uint256 => EnergyCredit) public energyCredits;
    uint256 public totalEnergyCredits;

    event EnergyCreditCreated(uint256 indexed id, address indexed owner, uint256 amount);
    event EnergyCreditTransferred(uint256 indexed id, address indexed from, address indexed to);

    function createEnergyCredit(uint256 amount) external onlyOwner {
        totalEnergyCredits++;
        energyCredits[totalEnergyCredits] = EnergyCredit(totalEnergyCredits, msg.sender, amount, true);
        emit EnergyCreditCreated(totalEnergyCredits, msg.sender, amount);
    }

    function transferEnergyCredit(uint256 creditId, address to) external {
        require(energyCredits[creditId].isActive, "Credit is not active");
        require(energyCredits[creditId].owner == msg.sender, "Not the owner");

        energyCredits[creditId].owner = to;
        emit EnergyCreditTransferred(creditId, msg.sender, to);
    }

    function deactivateEnergyCredit(uint256 creditId) external onlyOwner {
        energyCredits[creditId].isActive = false;
    }
}
