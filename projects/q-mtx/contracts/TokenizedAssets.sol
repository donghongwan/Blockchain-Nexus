// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenizedAssets is ERC20, Ownable {
    struct Asset {
        string name;
        string description;
        uint256 value; // Value in wei
        bool isTokenized;
    }

    mapping(uint256 => Asset) public assets;
    uint256 public assetCount;

    event AssetTokenized(uint256 indexed assetId, string name, uint256 value);
    event AssetTransferred(uint256 indexed assetId, address indexed from, address indexed to, uint256 amount);

    constructor() ERC20("TokenizedAsset", "TAS") {}

    function tokenizeAsset(string memory _name, string memory _description, uint256 _value) public onlyOwner {
        assetCount++;
        assets[assetCount] = Asset(_name, _description, _value, true);
        _mint(msg.sender, _value); // Mint tokens equivalent to the asset value
        emit AssetTokenized(assetCount, _name, _value);
    }

    function transferAsset(uint256 _assetId, address _to, uint256 _amount) public {
        require(assets[_assetId].isTokenized, "Asset not tokenized");
        require(balanceOf(msg.sender) >= _amount, "Insufficient token balance");

        _transfer(msg.sender, _to, _amount);
        emit AssetTransferred(_assetId, msg.sender, _to, _amount);
    }
}
