// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";

contract MySmartContract is AccessControl, Initializable, UUPSUpgradeable {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");

    event DataStored(address indexed user, string data);
    event RoleGranted(bytes32 indexed role, address indexed account);
    event RoleRevoked(bytes32 indexed role, address indexed account);

    mapping(address => string) private userData;

    // Initialize the contract with the deployer as the admin
    function initialize() public initializer {
        _setupRole(ADMIN_ROLE, msg.sender);
        _setupRole(USER_ROLE, msg.sender);
    }

    // Function to store data associated with a user
    function storeData(string memory data) public onlyRole(USER_ROLE) {
        userData[msg.sender] = data;
        emit DataStored(msg.sender, data);
    }

    // Function to retrieve data associated with a user
    function retrieveData(address user) public view returns (string memory) {
        return userData[user];
    }

    // Function to grant roles
    function grantRole(bytes32 role, address account) public onlyRole(ADMIN_ROLE) {
        _grantRole(role, account);
        emit RoleGranted(role, account);
    }

    // Function to revoke roles
    function revokeRole(bytes32 role, address account) public onlyRole(ADMIN_ROLE) {
        _revokeRole(role, account);
        emit RoleRevoked(role, account);
    }

    // Override required by the UUPSUpgradeable
    function _authorizeUpgrade(address newImplementation) internal onlyRole(ADMIN_ROLE) override {}

    // Example function to interact with an oracle (placeholder)
    function fetchExternalData() public view returns (string memory) {
        // Logic to interact with an oracle would go here
        return "External data fetched";
    }
}
