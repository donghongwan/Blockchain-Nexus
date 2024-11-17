// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";

contract Loan {
    Token public token;
    struct LoanRequest {
        address borrower;
        uint256 amount;
        uint256 interestRate;
        uint256 duration;
        bool isApproved;
        bool isRepaid;
    }

    LoanRequest[] public loanRequests;

    event LoanRequested(address indexed borrower, uint256 amount, uint256 interestRate, uint256 duration);
    event LoanApproved(uint256 indexed loanId);
    event LoanRepaid(uint256 indexed loanId);

    constructor(address _tokenAddress) {
        token = Token(_tokenAddress);
    }

    function requestLoan(uint256 amount, uint256 interestRate, uint256 duration) external {
        loanRequests.push(LoanRequest(msg.sender, amount, interestRate, duration, false, false));
        emit LoanRequested(msg.sender, amount, interestRate, duration);
    }

    function approveLoan(uint256 loanId) external {
        LoanRequest storage loan = loanRequests[loanId];
        require(!loan.isApproved, "Loan already approved");
        loan.isApproved = true;
        emit LoanApproved(loanId);
    }

    function repayLoan(uint256 loanId) external {
        LoanRequest storage loan = loanRequests[loanId];
        require(loan.isApproved, "Loan not approved");
        require(!loan.isRepaid, "Loan already repaid");

        uint256 totalRepayment = loan.amount + (loan.amount * loan.interestRate / 100);
        token.transferFrom(msg.sender, address(this), totalRepayment);
        loan.isRepaid = true;
        emit LoanRepaid(loanId);
    }
}
