// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenizedRealEstate is ERC20, Ownable {
    struct Property {
        string location;
        uint256 value; // Value in wei
        bool isTokenized;
    }

    mapping(uint256 => Property) public properties;
    uint256 public propertyCount;

    event PropertyTokenized(uint256 indexed propertyId, string location, uint256 value);
    event PropertyTransferred(uint256 indexed propertyId, address indexed from, address indexed to, uint256 amount);

    constructor() ERC20("RealEstateToken", "RET") {}

    function tokenizeProperty(string memory _location, uint256 _value) public onlyOwner {
        propertyCount++;
        properties[propertyCount] = Property(_location, _value, true);
        _mint(msg.sender, _value); // Mint tokens equivalent to the property value
        emit PropertyTokenized(propertyCount, _location, _value);
    }

    function transferProperty(uint256 _propertyId, address _to, uint256 _amount) public {
        require(properties[_propertyId].isTokenized, "Property not tokenized");
        require(balanceOf(msg.sender) >= _amount, "Insufficient token balance");

        _transfer(msg.sender, _to, _amount);
        emit PropertyTransferred(_propertyId, msg.sender, _to, _amount);
    }
}
