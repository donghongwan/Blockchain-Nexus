// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Governance.sol"; // Assume Governance.sol is implemented

contract DAOFactory {
    event DAOCreated(address daoAddress);

    function createDAO(string memory _name, address[] memory _members) public {
        Governance newDAO = new Governance(_name, _members);
        emit DAOCreated(address(newDAO));
    }
}
