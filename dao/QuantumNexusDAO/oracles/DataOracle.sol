// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDataProvider {
    function getData() external view returns (bytes memory);
}

contract DataOracle {
    address public dataProvider;
    bytes public latestData;

    event DataUpdated(bytes data);

    constructor(address _dataProvider) {
        dataProvider = _dataProvider;
    }

    function updateData() public {
        latestData = IDataProvider(dataProvider).getData();
        emit DataUpdated(latestData);
    }

    function getLatestData() public view returns (bytes memory) {
        return latestData;
    }
}
