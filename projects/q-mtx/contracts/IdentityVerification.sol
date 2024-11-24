// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentityVerification {
    struct Identity {
        string name;
        string email;
        bool isVerified;
    }

    mapping(address => Identity) public identities;

    event IdentityRegistered(address indexed user, string name, string email);
    event IdentityVerified(address indexed user);

    function registerIdentity(string memory _name, string memory _email) public {
        require(bytes(identities[msg.sender].name).length == 0, "Identity already registered");
        
        identities[msg.sender] = Identity(_name, _email, false);
        emit IdentityRegistered(msg.sender, _name, _email);
    }

    function verifyIdentity(address _user) public {
        // In a real-world scenario, this function would include verification logic
        require(bytes(identities[_user].name).length > 0, "Identity not registered");
        
        identities[_user].isVerified = true;
        emit IdentityVerified(_user);
    }

    function isIdentityVerified(address _user) public view returns (bool) {
        return identities[_user].isVerified;
    }
}
