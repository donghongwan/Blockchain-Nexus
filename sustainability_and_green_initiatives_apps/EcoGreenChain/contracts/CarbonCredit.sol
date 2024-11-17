// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCredit is Ownable {
    struct Credit {
        uint256 id;
        address owner;
        uint256 amount;
        bool isActive;
    }

    mapping(uint256 => Credit) public credits;
    uint256 public totalCredits;

    event CreditCreated(uint256 indexed id, address indexed owner, uint256 amount);
    event CreditTransferred(uint256 indexed id, address indexed from, address indexed to);

    function createCredit(uint256 amount) external onlyOwner {
        totalCredits++;
        credits[totalCredits] = Credit(totalCredits, msg.sender, amount, true);
        emit CreditCreated(totalCredits, msg.sender, amount);
    }

    function transferCredit(uint256 creditId, address to) external {
        require(credits[creditId].isActive, "Credit is not active");
        require(credits[creditId].owner == msg.sender, "Not the owner");

        credits[creditId].owner = to;
        emit CreditTransferred(creditId, msg.sender, to);
    }

    function deactivateCredit(uint256 creditId) external onlyOwner {
        credits[creditId].isActive = false;
    }
  }
