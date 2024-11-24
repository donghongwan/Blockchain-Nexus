// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketplace {
    struct Listing {
        address seller;
        uint price;
        bool isActive;
    }

    mapping(address => mapping(uint => Listing)) public listings;

    event Listed(address indexed nftAddress, uint indexed tokenId, uint price);
    event Sold(address indexed nftAddress, uint indexed tokenId, address buyer);

    function listNFT(address nftAddress, uint tokenId, uint price) public {
        IERC721(nftAddress).transferFrom(msg.sender, address(this), tokenId);
        listings[nftAddress][tokenId] = Listing(msg.sender, price, true);
        emit Listed(nftAddress, tokenId, price);
    }

    function buyNFT(address nftAddress, uint tokenId) public payable {
        Listing storage listing = listings[nftAddress][tokenId];
        require(listing.isActive, "NFT not for sale");
        require(msg.value >= listing.price, "Insufficient funds");

        listing.isActive = false;
        payable(listing.seller).transfer(msg.value);
        IERC721(nftAddress).transferFrom(address(this), msg.sender, tokenId);
        emit Sold(nftAddress, tokenId, msg.sender);
    }
}
