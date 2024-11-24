// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DynamicNFT is ERC721, Ownable {
    struct NFTAttributes {
        string name;
        string description;
        uint256 level;
    }

    mapping(uint256 => NFTAttributes) public nftAttributes;

    event AttributesUpdated(uint256 indexed tokenId, string name, string description, uint256 level);

    constructor() ERC721("DynamicNFT", "DNFT") {}

    function mintNFT(address _to, uint256 _tokenId, string memory _name, string memory _description) public onlyOwner {
        _mint(_to, _tokenId);
        nftAttributes[_tokenId] = NFTAttributes(_ name, _description, 1); // Initial level set to 1
        emit AttributesUpdated(_tokenId, _name, _description, 1);
    }

    function updateAttributes(uint256 _tokenId, string memory _name, string memory _description, uint256 _level) public onlyOwner {
        require(_exists(_tokenId), "Token does not exist");
        nftAttributes[_tokenId] = NFTAttributes(_name, _description, _level);
        emit AttributesUpdated(_tokenId, _name, _description, _level);
    }

    function getAttributes(uint256 _tokenId) public view returns (string memory name, string memory description, uint256 level) {
        require(_exists(_tokenId), "Token does not exist");
        NFTAttributes storage attributes = nftAttributes[_tokenId];
        return (attributes.name, attributes.description, attributes.level);
    }
}
