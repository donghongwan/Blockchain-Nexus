// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FlashLoan {
    event LoanTaken(address indexed borrower, uint256 amount);
    event LoanRepaid(address indexed borrower, uint256 amount);

    function flashLoan(address _token, uint256 _amount) public {
        IERC20(_token).transfer(msg.sender, _amount);
        emit LoanTaken(msg.sender, _amount);

        // Execute the logic that uses the loaned amount
        // Borrower must call `repayLoan` at the end of their logic
    }

    function repayLoan(address _token, uint256 _amount) public {
        require(IERC20(_token).balanceOf(msg.sender) >= _amount, "Insufficient balance to repay");

        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        emit LoanRepaid(msg.sender, _amount);
    }
}
