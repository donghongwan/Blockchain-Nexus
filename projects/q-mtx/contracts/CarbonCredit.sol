// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCredit is ERC20, Ownable {
    event CarbonCreditIssued(address indexed account, uint256 amount);
    event CarbonCreditTransferred(address indexed from, address indexed to, uint256 amount);

    constructor() ERC20("CarbonCredit", "CC") {}

    function issueCredits(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
        emit CarbonCreditIssued(_to, _amount);
    }

    function transferCredits(address _to, uint256 _amount) public {
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");
        _transfer(msg.sender, _to, _amount);
        emit CarbonCreditTransferred(msg.sender, _to, _amount);
    }
}
