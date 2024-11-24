// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Governance.sol";

contract DAOFactory {
    Governance[] public daos;

    function createDAO(uint quorum) public {
        Governance newDAO = new Governance(quorum);
        daos.push(newDAO);
    }

    function getDAOs() public view returns (Governance[] memory) {
        return daos;
    }
}
