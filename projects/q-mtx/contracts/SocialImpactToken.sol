// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SocialImpactToken is ERC20, Ownable {
    event ProjectFunded(address indexed projectOwner, uint256 amount);

    constructor() ERC20("SocialImpactToken", "SIT") {}

    function fundProject(address _projectOwner, uint256 _amount) public {
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");
        _transfer(msg.sender, _projectOwner, _amount);
        emit ProjectFunded(_projectOwner, _amount);
    }
}
