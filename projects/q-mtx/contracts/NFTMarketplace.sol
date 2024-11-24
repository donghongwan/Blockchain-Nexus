// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract NFTMarketplace is ERC721Holder {
    struct Listing {
        address seller;
        uint256 price;
        bool isActive;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;

    event NFTListed(address indexed nftAddress, uint256 indexed tokenId, uint256 price);
    event NFTSold(address indexed nftAddress, uint256 indexed tokenId, address buyer, uint256 price);

    function listNFT(address _nftAddress, uint256 _tokenId, uint256 _price) public {
        IERC721(_nftAddress).safeTransferFrom(msg.sender, address(this), _tokenId);
        listings[_nftAddress][_tokenId] = Listing(msg.sender, _price, true);
        emit NFTListed(_nftAddress, _tokenId, _price);
    }

    function buyNFT(address _nftAddress, uint256 _tokenId) public payable {
        Listing memory listing = listings[_nftAddress][_tokenId];
        require(listing.isActive, "NFT not for sale");
        require(msg.value >= listing.price, "Insufficient funds");

        // Transfer funds to seller
        payable(listing.seller).transfer(listing.price);
        IERC721(_nftAddress).safeTransferFrom(address(this), msg.sender, _tokenId);
        listings[_nftAddress][_tokenId].isActive = false;

        emit NFTSold(_nftAddress, _tokenId, msg.sender, listing.price);
    }
}
