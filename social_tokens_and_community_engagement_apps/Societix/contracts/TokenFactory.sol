// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SocialToken.sol";

contract TokenFactory {
    mapping(address => address[]) public userTokens;

    function createToken(string memory name, string memory symbol, uint256 initialSupply) external {
        SocialToken newToken = new SocialToken(name, symbol, initialSupply);
        userTokens[msg.sender].push(address(newToken));
    }

    function getUserTokens(address user) external view returns (address[] memory) {
        return userTokens[user];
    }
}
