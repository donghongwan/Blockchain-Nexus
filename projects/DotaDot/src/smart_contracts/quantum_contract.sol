// smart_contracts/quantum_contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QuantumDataManagement {
    struct QuantumData {
        uint256 id; // Unique identifier for the quantum data
        string data; // The quantum data (could be a hash or encoded data)
        address owner; // The owner of the data
        uint256 timestamp; // When the data was submitted
    }

    mapping(uint256 => QuantumData) public quantumDataStore; // Mapping of data ID to QuantumData
    uint256 public dataCount; // Counter for the number of data entries

    event DataSubmitted(uint256 indexed id, string data, address indexed owner);
    event DataRetrieved(uint256 indexed id, string data, address indexed owner);

    modifier onlyOwner(uint256 _id) {
        require(msg.sender == quantumDataStore[_id].owner, "Not the owner of this data");
        _;
    }

    // Function to submit quantum data
    function submitQuantumData(string calldata _data) external {
        dataCount++;
        quantumDataStore[dataCount] = QuantumData({
            id: dataCount,
            data: _data,
            owner: msg.sender,
            timestamp: block.timestamp
        });

        emit DataSubmitted(dataCount, _data, msg.sender);
    }

    // Function to retrieve quantum data
    function retrieveQuantumData(uint256 _id) external view onlyOwner(_id) returns (string memory) {
        QuantumData storage qData = quantumDataStore[_id];
        emit DataRetrieved(_id, qData.data, msg.sender);
        return qData.data;
    }

    // Function to get data details
    function getQuantumDataDetails(uint256 _id) external view returns (uint256 id, string memory data, address owner, uint256 timestamp) {
        QuantumData storage qData = quantumDataStore[_id];
        return (qData.id, qData.data, qData.owner, qData.timestamp);
    }
}
