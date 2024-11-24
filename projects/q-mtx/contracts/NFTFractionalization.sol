// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTFractionalization is ERC20, Ownable {
    IERC721 public nft;
    uint256 public nftId;

    event NFTFractionalized(address indexed owner, uint256 indexed nftId, uint256 totalShares);
    event SharesTransferred(address indexed from, address indexed to, uint256 amount);

    constructor(IERC721 _nft, uint256 _nftId) ERC20("NFTFraction", "NFTF") {
        nft = _nft;
        nftId = _nftId;
    }

    function fractionalize(uint256 totalShares) public onlyOwner {
        require(nft.ownerOf(nftId) == msg.sender, "Not the NFT owner");
        _mint(msg.sender, totalShares);
        emit NFTFractionalized(msg.sender, nftId, totalShares);
    }

    function transferShares(address _to, uint256 _amount) public {
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");
        _transfer(msg.sender, _to, _amount);
        emit SharesTransferred(msg.sender, _to, _amount);
    }
}
