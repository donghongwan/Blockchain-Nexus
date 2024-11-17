// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MultiSigWallet is Ownable {
    event Deposit(address indexed sender, uint256 amount);
    event SubmitTransaction(address indexed owner, uint256 indexed txIndex);
    event ApproveTransaction(address indexed owner, uint256 indexed txIndex);
    event RevokeTransaction(address indexed owner, uint256 indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint256 indexed txIndex);

    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint256 approvalCount;
    }

    address[] public owners;
    mapping(address => bool) public isOwner;
    mapping(uint256 => mapping(address => bool)) public approved;
    Transaction[] public transactions;

    uint256 public required;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not an owner");
        _;
    }

    modifier txExists(uint256 txIndex) {
        require(txIndex < transactions.length, "Transaction does not exist");
        _;
    }

    modifier notExecuted(uint256 txIndex) {
        require(!transactions[txIndex].executed, "Transaction already executed");
        _;
    }

    modifier notApproved(uint256 txIndex) {
        require(!approved[txIndex][msg.sender], "Transaction already approved");
        _;
    }

    constructor(address[] memory _owners, uint256 _required) {
        require(_owners.length > 0, "Owners required");
        require(_required > 0 && _required <= _owners.length, "Invalid required number of owners");

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Invalid owner");
            require(!isOwner[owner], "Owner is not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }
        required = _required;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function submitTransaction(address to, uint256 value, bytes memory data) external onlyOwner {
        uint256 txIndex = transactions.length;

        transactions.push(Transaction({
            to: to,
            value: value,
            data: data,
            executed: false,
            approvalCount: 0
        }));

        emit SubmitTransaction(msg.sender, txIndex);
    }

    function approveTransaction(uint256 txIndex) external onlyOwner txExists(txIndex) notApproved(txIndex) notExecuted(txIndex) {
        approved[txIndex][msg.sender] = true;
        transactions[txIndex].approvalCount++;

        emit ApproveTransaction(msg.sender, txIndex);
    }

    function revokeTransaction(uint256 txIndex) external onlyOwner txExists(txIndex) notExecuted(txIndex) {
        require(approved[txIndex][msg.sender], "Transaction not approved");

        approved[txIndex][msg.sender] = false;
        transactions[txIndex].approvalCount--;

        emit RevokeTransaction(msg.sender, txIndex);
    }

    function executeTransaction(uint256 txIndex) external onlyOwner txExists(txIndex) notExecuted(txIndex) {
        require(transactions[txIndex].approvalCount >= required, "Not enough approvals");

        Transaction storage transaction = transactions[txIndex];
        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}(transaction.data);
        require(success, "Transaction failed");

        emit ExecuteTransaction(msg.sender, txIndex);
    }

    function getTransactionCount() external view returns (uint256) {
        return transactions.length;
    }

    function getTransaction(uint256 txIndex) external view returns (address, uint256, bytes memory, bool, uint256) {
        Transaction storage transaction = transactions[txIndex];
        return (transaction.to, transaction.value, transaction.data, transaction.executed, transaction.approvalCount);
    }

    function getOwners() external view returns (address[] memory) {
        return owners;
    }
}
