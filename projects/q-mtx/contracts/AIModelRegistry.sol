// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AIModelRegistry {
    struct AIModel {
        string modelName;
        string modelHash;
        address owner;
        bool isRegistered;
    }

    mapping(uint256 => AIModel) public models;
    uint256 public modelCount;

    event ModelRegistered(uint256 indexed modelId, string modelName, string modelHash, address indexed owner);
    event ModelUpdated(uint256 indexed modelId, string modelHash);

    function registerModel(string memory _modelName, string memory _modelHash) public {
        modelCount++;
        models[modelCount] = AIModel(_modelName, _modelHash, msg.sender, true);
        emit ModelRegistered(modelCount, _modelName, _modelHash, msg.sender);
    }

    function updateModel(uint256 _modelId, string memory _modelHash) public {
        require(models[_modelId].isRegistered, "Model not registered");
        require(models[_modelId].owner == msg.sender, "Not the model owner");
        models[_modelId].modelHash = _modelHash;
        emit ModelUpdated(_modelId, _modelHash);
    }

    function getModel(uint256 _modelId) public view returns (string memory modelName, string memory modelHash, address owner) {
        require(models[_modelId].isRegistered, "Model not registered");
        AIModel storage model = models[_modelId];
        return (model.modelName, model.modelHash, model.owner);
    }
}
