// contracts/DataOracle.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IOracle {
    function getData() external view returns (string memory);
}

contract DataOracle {
    IOracle public oracle;

    constructor(address _oracleAddress) {
        oracle = IOracle(_oracleAddress);
    }

    function fetchData() public view returns (string memory) {
        return oracle.getData();
    }
}
