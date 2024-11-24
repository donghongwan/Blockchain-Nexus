// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address public buyer;
    address public seller;
    uint public amount;
    bool public isCompleted;

    event EscrowCreated(address indexed buyer, address indexed seller, uint amount);
    event EscrowCompleted(address indexed buyer, address indexed seller);

    constructor(address _seller) {
        seller = _seller;
    }

    function deposit() public payable {
        require(msg.sender == buyer, "Only buyer can deposit");
        amount = msg.value;
        emit EscrowCreated(buyer, seller, amount);
    }

    function complete() public {
        require(msg.sender == seller, "Only seller can complete");
        require(!isCompleted, "Escrow already completed");
        isCompleted = true;
        payable(seller).transfer(amount);
        emit EscrowCompleted(buyer, seller);
    }
}
