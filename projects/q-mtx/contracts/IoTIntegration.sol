// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IoTIntegration {
    struct Device {
        string deviceId;
        string data;
        address owner;
    }

    mapping(string => Device) public devices;

    event DeviceRegistered(string indexed deviceId, address indexed owner);
    event DataUpdated(string indexed deviceId, string data);

    function registerDevice(string memory _deviceId) public {
        require(devices[_deviceId].owner == address(0), "Device already registered");
        devices[_deviceId] = Device(_deviceId, "", msg.sender);
        emit DeviceRegistered(_deviceId, msg.sender);
    }

    function updateData(string memory _deviceId, string memory _data) public {
        require(devices[_deviceId].owner == msg.sender, "Not the device owner");
        devices[_deviceId].data = _data;
        emit DataUpdated(_deviceId, _data);
    }

    function getDeviceData(string memory _deviceId) public view returns (string memory) {
        return devices[_deviceId].data;
    }
}
