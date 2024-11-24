// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DecentralizedExchange {
    event Trade(address indexed buyer, address indexed seller, address indexed token, uint256 amount, uint256 price);

    function trade(address _token, uint256 _amount, uint256 _price, address _seller) public payable {
        require(msg.value >= _amount * _price, "Insufficient funds sent");

        IERC20(_token).transferFrom(_seller, msg.sender, _amount);
        payable(_seller).transfer(msg.value); // Transfer ETH to the seller

        emit Trade(msg.sender, _seller, _token, _amount, _price);
    }
}
