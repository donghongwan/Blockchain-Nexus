// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract IdentityVerificationContract is Ownable {
    event IdentityVerified(address indexed user, string identityHash);

    struct Identity {
        string identityHash;
        bool isVerified;
    }

    mapping(address => Identity) private identities;

    function submitIdentity(string calldata identityHash) external {
        identities[msg.sender] = Identity(identityHash, false);
    }

    function verifyIdentity(address user) external onlyOwner {
        require(bytes(identities[user].identityHash).length > 0, "Identity not submitted");
        identities[user].isVerified = true;
        emit IdentityVerified(user, identities[user].identityHash);
    }

    function isIdentityVerified(address user) external view returns (bool) {
        return identities[user].isVerified;
    }
}
