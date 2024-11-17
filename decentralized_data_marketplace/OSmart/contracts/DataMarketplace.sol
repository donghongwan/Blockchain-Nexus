// contracts/DataMarketplace.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataMarketplace {
    struct DataListing {
        address seller;
        string dataHash;
        uint256 price;
        bool isActive;
    }

    mapping(uint256 => DataListing) public listings;
    uint256 public listingCount;

    event DataListed(uint256 indexed listingId, address indexed seller, string dataHash, uint256 price);
    event DataPurchased(uint256 indexed listingId, address indexed buyer);

    function listData(string memory _dataHash, uint256 _price) public {
        listingCount++;
        listings[listingCount] = DataListing(msg.sender, _dataHash, _price, true);
        emit DataListed(listingCount, msg.sender, _dataHash, _price);
    }

    function purchaseData(uint256 _listingId) public payable {
        DataListing storage listing = listings[_listingId];
        require(listing.isActive, "Data listing is not active");
        require(msg.value >= listing.price, "Insufficient payment");

        listing.isActive = false;
        payable(listing.seller).transfer(msg.value);
        emit DataPurchased(_listingId, msg.sender);
    }
}
