// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DecentralizedIdentity is Ownable {
    struct Identity {
        string name;
        string email;
        string metadata; // Additional metadata
        bytes32 zkProof; // Zero-knowledge proof for privacy
        bool exists;
    }

    mapping(address => Identity) public identities;

    event IdentityCreated(address indexed user, string name, string email);
    event IdentityUpdated(address indexed user, string name, string email, string metadata, bytes32 zkProof);

    // Function to create or update identity
    function setIdentity(string memory name, string memory email, string memory metadata, bytes32 zkProof) external {
        Identity storage identity = identities[msg.sender];
        if (!identity.exists) {
            identity.exists = true;
            emit IdentityCreated(msg.sender, name, email);
        }
        identity.name = name;
        identity.email = email;
        identity.metadata = metadata;
        identity.zkProof = zkProof;
        emit IdentityUpdated(msg.sender, name, email, metadata, zkProof);
    }

    // Function to get identity
    function getIdentity(address user) external view returns (string memory, string memory, string memory, bytes32) {
        Identity memory identity = identities[user];
        require(identity.exists, "Identity does not exist");
        return (identity.name, identity.email, identity.metadata, identity.zkProof);
    }
}
