// smart_contracts/nft_marketplace_contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTMarketplace {
    struct Listing {
        address seller;
        uint256 price; // Price in the payment token
        bool isActive; // Listing status
    }

    IERC20 public paymentToken; // Token used for payments
    mapping(address => mapping(uint256 => Listing)) public listings; // Mapping of NFT contract address to token ID to Listing
    event NFTListed(address indexed nftContract, uint256 indexed tokenId, address indexed seller, uint256 price);
    event NFTSold(address indexed nftContract, uint256 indexed tokenId, address indexed buyer, address indexed seller, uint256 price);
    event NFTDelisted(address indexed nftContract, uint256 indexed tokenId, address indexed seller);

    constructor(IERC20 _paymentToken) {
        paymentToken = _paymentToken;
    }

    function listNFT(address _nftContract, uint256 _tokenId, uint256 _price) external {
        require(_price > 0, "Price must be greater than zero");
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "You do not own this NFT");
        require(nft.getApproved(_tokenId) == address(this), "Marketplace not approved to manage this NFT");

        listings[_nftContract][_tokenId] = Listing({
            seller: msg.sender,
            price: _price,
            isActive: true
        });

        emit NFTListed(_nftContract, _tokenId, msg.sender, _price);
    }

    function buyNFT(address _nftContract, uint256 _tokenId) external {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.isActive, "NFT is not listed for sale");
        require(paymentToken.transferFrom(msg.sender, listing.seller, listing.price), "Payment failed");

        IERC721(_nftContract).safeTransferFrom(listing.seller, msg.sender, _tokenId);
        listing.isActive = false; // Mark the listing as inactive

        emit NFTSold(_nftContract, _tokenId, msg.sender, listing.seller, listing.price);
    }

    function delistNFT(address _nftContract, uint256 _tokenId) external {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.seller == msg.sender, "You are not the seller");
        require(listing.isActive, "NFT is not listed");

        listing.isActive = false; // Mark the listing as inactive

        emit NFTDelisted(_nftContract, _tokenId, msg.sender);
    }

    function getListing(address _nftContract, uint256 _tokenId) external view returns (Listing memory) {
        return listings[_nftContract][_tokenId];
    }
}
