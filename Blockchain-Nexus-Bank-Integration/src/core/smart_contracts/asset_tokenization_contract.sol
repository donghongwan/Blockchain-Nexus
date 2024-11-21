// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AssetTokenizationContract is ERC20, Ownable {
    event AssetTokenized(address indexed owner, uint256 amount, string assetDetails);

    struct Asset {
        string details;
        uint256 amount;
    }

    mapping(uint256 => Asset) public assets;
    uint256 public assetCount;

    constructor() ERC20("AssetToken", "ATK") {}

    function tokenizeAsset(string calldata details, uint256 amount) external onlyOwner {
        assetCount++;
        assets[assetCount] = Asset(details, amount);
        _mint(msg.sender, amount);
        emit AssetTokenized(msg.sender, amount, details);
    }

    function getAssetDetails(uint256 assetId) external view returns (string memory, uint256) {
        Asset memory asset = assets[assetId];
        return (asset.details, asset.amount);
    }
}
