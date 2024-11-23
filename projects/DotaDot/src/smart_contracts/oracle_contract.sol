// smart_contracts/oracle_contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Oracle {
    struct Data {
        uint256 value; // The value of the data
        uint256 timestamp; // The time the data was submitted
        address oracle; // The address of the oracle that submitted the data
    }

    mapping(bytes32 => Data) public data; // Mapping of data identifiers to Data
    mapping(address => bool) public oracles; // Mapping of authorized oracles

    event DataSubmitted(bytes32 indexed dataId, uint256 value, address indexed oracle);
    event OracleAdded(address indexed oracle);
    event OracleRemoved(address indexed oracle);

    modifier onlyOracle() {
        require(oracles[msg.sender], "Only authorized oracles can submit data");
        _;
    }

    constructor() {
        // The contract deployer is the first authorized oracle
        oracles[msg.sender] = true;
        emit OracleAdded(msg.sender);
    }

    // Function to add a new oracle
    function addOracle(address _oracle) external {
        oracles[_oracle] = true;
        emit OracleAdded(_oracle);
    }

    // Function to remove an oracle
    function removeOracle(address _oracle) external {
        oracles[_oracle] = false;
        emit OracleRemoved(_oracle);
    }

    // Function to submit data
    function submitData(bytes32 _dataId, uint256 _value) external onlyOracle {
        data[_dataId] = Data({
            value: _value,
            timestamp: block.timestamp,
            oracle: msg.sender
        });

        emit DataSubmitted(_dataId, _value, msg.sender);
    }

    // Function to retrieve data
    function getData(bytes32 _dataId) external view returns (uint256 value, uint256 timestamp, address oracle) {
        Data storage d = data[_dataId];
        return (d.value, d.timestamp, d.oracle);
    }
}
