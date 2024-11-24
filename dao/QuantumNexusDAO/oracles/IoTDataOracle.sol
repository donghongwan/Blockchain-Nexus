// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IIoTDataProvider {
    function getIoTData() external view returns (uint256 temperature, uint256 humidity, uint256 pressure);
}

contract IoTDataOracle {
    address public iotDataProvider;
    uint256 public latestTemperature;
    uint256 public latestHumidity;
    uint256 public latestPressure;

    event IoTDataUpdated(uint256 temperature, uint256 humidity, uint256 pressure);

    constructor(address _iotDataProvider) {
        iotDataProvider = _iotDataProvider;
    }

    function updateIoTData() public {
        (latestTemperature, latestHumidity, latestPressure) = IIoTDataProvider(iotDataProvider).getIoTData();
        emit IoTDataUpdated(latestTemperature, latestHumidity, latestPressure);
    }

    function getLatestIoTData() public view returns (uint256, uint256, uint256) {
        return (latestTemperature, latestHumidity, latestPressure);
    }
}
