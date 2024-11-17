// contracts/UserData.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserData {
    mapping(address => string) private userData;

    function storeData(string memory _data) public {
        userData[msg.sender] = _data;
    }

    function getData() public view returns (string memory) {
        return userData[msg.sender];
    }
}
