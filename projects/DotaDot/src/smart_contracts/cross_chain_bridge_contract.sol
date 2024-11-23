// smart_contracts/cross_chain_bridge_contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CrossChainBridge {
    IERC20 public token; // The token being bridged
    address public admin; // Admin address for managing the bridge

    // Events for logging actions
    event TokensLocked(address indexed user, uint256 amount, string targetChain);
    event TokensMinted(address indexed user, uint256 amount, string sourceChain);
    event TokensUnlocked(address indexed user, uint256 amount, string sourceChain);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor(IERC20 _token) {
        token = _token;
        admin = msg.sender; // Set the contract deployer as the admin
    }

    // Function to lock tokens on the source chain
    function lockTokens(uint256 _amount, string memory _targetChain) external {
        require(_amount > 0, "Amount must be greater than zero");

        // Transfer tokens from user to the bridge contract
        token.transferFrom(msg.sender, address(this), _amount);

        emit TokensLocked(msg.sender, _amount, _targetChain);
    }

    // Function to mint tokens on the target chain (to be called by the admin)
    function mintTokens(address _user, uint256 _amount, string memory _sourceChain) external onlyAdmin {
        // Minting logic would go here (depends on the target chain's implementation)
        emit TokensMinted(_user, _amount, _sourceChain);
    }

    // Function to unlock tokens on the source chain (to be called by the admin)
    function unlockTokens(address _user, uint256 _amount, string memory _sourceChain) external onlyAdmin {
        require(_amount > 0, "Amount must be greater than zero");

        // Transfer tokens back to the user
        token.transfer(_user, _amount);

        emit TokensUnlocked(_user, _amount, _sourceChain);
    }
}
