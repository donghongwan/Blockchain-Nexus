// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MachineLearningModel is Ownable {
    struct Model {
        string name;
        string description;
        bytes modelData; // Placeholder for model data
        uint256 version; // Versioning for models
        bool exists;
    }

    mapping(uint256 => Model) public models;
    uint256 public modelCount;

    event ModelAdded(uint256 indexed modelId, string name, string description, uint256 version);
    event ModelUpdated(uint256 indexed modelId, string name, string description, uint256 version);

    // Function to add a new machine learning model
    function addModel(string memory name, string memory description, bytes memory modelData) external onlyOwner {
        modelCount++;
        models[modelCount] = Model(name, description, modelData, 1, true);
        emit ModelAdded(modelCount, name, description, 1);
    }

    // Function to update an existing model
    function updateModel(uint256 modelId, string memory name, string memory description, bytes memory modelData) external onlyOwner {
        require(models[modelId].exists, "Model does not exist");
        models[modelId].name = name;
        models[modelId].description = description;
        models[modelId].modelData = modelData;
        models[modelId].version++;
        emit ModelUpdated(modelId, name, description, models[modelId].version);
    }

    // Function to get model details
    function getModel(uint256 modelId) external view returns (string memory, string memory, bytes memory, uint256) {
        require(models[modelId].exists, "Model does not exist");
        Model memory model = models[modelId];
        return (model.name, model.description, model.modelData, model.version);
    }
}
