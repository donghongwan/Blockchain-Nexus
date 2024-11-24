// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiSigWallet {
    address[] public owners;
    mapping(uint => mapping(address => bool)) public confirmations;
    uint public required;

    event Deposit(address indexed sender, uint amount);
    event SubmitTransaction(address indexed owner, uint indexed txIndex);
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);

    constructor(address[] memory _owners, uint _required) {
        owners = _owners;
        required = _required;
    }

    function deposit() public payable {
        emit Deposit(msg.sender, msg.value);
    }

    function submitTransaction() ```solidity
    public {
        // Logic for submitting a transaction
        emit SubmitTransaction(msg.sender, txIndex);
    }

    function confirmTransaction(uint txIndex) public {
        require(isOwner(msg.sender), "Not an owner");
        confirmations[txIndex][msg.sender] = true;
        emit ConfirmTransaction(msg.sender, txIndex);
        // Check if transaction can be executed
    }

    function isOwner(address owner) internal view returns (bool) {
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == owner) {
                return true;
            }
        }
        return false;
    }
}
