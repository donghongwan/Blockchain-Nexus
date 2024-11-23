// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MultiSigWallet is Ownable {
    event Deposit(address indexed sender, uint256 amount);
    event TransactionExecuted(address indexed to, uint256 value, bytes data);
    event OwnerAdded(address indexed owner);
    event OwnerRemoved(address indexed owner);
    event RequirementChanged(uint256 required);

    mapping(address => bool) public isOwner;
    address[] public owners;
    uint256 public required;

    modifier onlyOwners() {
        require(isOwner[msg.sender], "Not an owner");
        _;
    }

    constructor(address[] memory _owners, uint256 _required) {
        require(_owners.length > 0, "Owners required");
        require(_required > 0 && _required <= _owners.length, "Invalid requirement");

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Invalid owner");
            require(!isOwner[owner], "Owner not unique");
            isOwner[owner] = true;
            owners.push(owner);
        }
        required = _required;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function executeTransaction(address to, uint256 value, bytes memory data) external onlyOwners {
        require(address(this).balance >= value, "Insufficient balance");
        (bool success, ) = to.call{value: value}(data);
        require(success, "Transaction failed");
        emit TransactionExecuted(to, value, data);
    }

    function addOwner(address owner) external onlyOwner {
        require(!isOwner[owner], "Owner already exists");
        isOwner[owner] = true;
        owners.push(owner);
        emit OwnerAdded(owner);
    }

    function removeOwner(address owner) external onlyOwner {
        require(isOwner[owner], "Not an owner");
        isOwner[owner] = false;

        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == owner) {
                owners[i] = owners[owners.length - 1];
                owners.pop();
                break;
            }
        }
        emit OwnerRemoved(owner);
    }

    function changeRequirement(uint256 _required) external onlyOwner {
        require(_required > 0 && _required <= owners.length, "Invalid requirement");
        required = _required;
        emit RequirementChanged(_required);
    }
}
