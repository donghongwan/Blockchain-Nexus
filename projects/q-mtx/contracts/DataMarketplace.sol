// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataMarketplace {
    struct DataItem {
        string dataHash;
        uint256 price;
        address seller;
        bool isListed;
    }

    mapping(uint256 => DataItem) public dataItems;
    uint256 public dataItemCount;

    event DataListed(uint256 indexed itemId, string dataHash, uint256 price, address indexed seller);
    event DataPurchased(uint256 indexed itemId, address indexed buyer);

    function listData(string memory _dataHash, uint256 _price) public {
        dataItemCount++;
        dataItems[dataItemCount] = DataItem(_dataHash, _price, msg.sender, true);
        emit DataListed(dataItemCount, _dataHash, _price, msg.sender);
    }

    function purchaseData(uint256 _itemId) public payable {
        DataItem storage item = dataItems[_itemId];
        require(item.isListed, "Data not listed");
        require(msg.value >= item.price, "Insufficient funds");

        item.isListed = false;
        payable(item.seller).transfer(msg.value);
        emit DataPurchased(_itemId, msg.sender);
    }
}
