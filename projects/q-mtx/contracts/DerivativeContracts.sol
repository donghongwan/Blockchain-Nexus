// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DerivativeContracts {
    struct Derivative {
        address underlyingAsset;
        uint256 strikePrice;
        uint256 expiration;
        bool isExercised;
    }

    mapping(uint256 => Derivative) public derivatives;
    uint256 public derivativeCount;

    event DerivativeCreated(uint256 indexed derivativeId, address indexed underlyingAsset, uint256 strikePrice, uint256 expiration);
    event DerivativeExercised(uint256 indexed derivativeId, address indexed holder);

    function createDerivative(address _underlyingAsset, uint256 _strikePrice, uint256 _expiration) public {
        require(_expiration > block.timestamp, "Expiration must be in the future");
        derivativeCount++;
        derivatives[derivativeCount] = Derivative(_underlyingAsset, _strikePrice, _expiration, false);
        emit DerivativeCreated(derivativeCount, _underlyingAsset, _strikePrice, _expiration);
    }

    function exerciseDerivative(uint256 _derivativeId) public {
        Derivative storage derivative = derivatives[_derivativeId];
        require(!derivative.isExercised, "Derivative already exercised");
        require(block.timestamp < derivative.expiration, "Derivative expired");

        // Logic for exercising the derivative (e.g., transferring underlying asset)
        derivative.isExercised = true;
        emit DerivativeExercised(_derivativeId, msg.sender);
    }
}
