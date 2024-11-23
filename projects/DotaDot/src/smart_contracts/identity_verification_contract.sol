// smart_contracts/identity_verification_contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentityVerification {
    struct Identity {
        string name; // User's name
        string email; // User's email
        bool isVerified; // Verification status
        uint256 verificationTimestamp; // Timestamp of verification
    }

    mapping(address => Identity) public identities; // Mapping of user addresses to their identities
    address public admin; // Admin address for managing verifications

    event IdentityRegistered(address indexed user, string name, string email);
    event IdentityVerified(address indexed user, uint256 timestamp);
    event IdentityRevoked(address indexed user);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender; // Set the contract deployer as the admin
    }

    function registerIdentity(string memory _name, string memory _email) external {
        require(bytes(identities[msg.sender].name).length == 0, "Identity already registered");

        identities[msg.sender] = Identity({
            name: _name,
            email: _email,
            isVerified: false,
            verificationTimestamp: 0
        });

        emit IdentityRegistered(msg.sender, _name, _email);
    }

    function verifyIdentity(address _user) external onlyAdmin {
        require(bytes(identities[_user].name).length > 0, "Identity not registered");
        require(!identities[_user].isVerified, "Identity already verified");

        identities[_user].isVerified = true;
        identities[_user].verificationTimestamp = block.timestamp;

        emit IdentityVerified(_user, block.timestamp);
    }

    function revokeIdentity(address _user) external onlyAdmin {
        require(bytes(identities[_user].name).length > 0, "Identity not registered");
        require(identities[_user].isVerified, "Identity not verified");

        identities[_user].isVerified = false;
        identities[_user].verificationTimestamp = 0;

        emit IdentityRevoked(_user);
    }

    function getIdentity(address _user) external view returns (string memory, string memory, bool, uint256) {
        Identity memory identity = identities[_user];
        return (identity.name, identity.email, identity.isVerified, identity.verificationTimestamp);
    }
}
