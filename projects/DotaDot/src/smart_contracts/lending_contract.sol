// smart_contracts/lending_contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LendingContract {
    struct Loan {
        address borrower;
        uint256 amount;
        uint256 interestRate; // Interest rate in basis points (1/100th of a percent)
        uint256 duration; // Duration in seconds
        uint256 startTime; // Timestamp when the loan was issued
        uint256 collateral; // Amount of collateral provided
        bool isPaid; // Loan status
    }

    mapping(uint256 => Loan) public loans;
    uint256 public loanCount;

    event LoanCreated(uint256 loanId, address indexed borrower, uint256 amount, uint256 interestRate, uint256 duration, uint256 collateral);
    event LoanPaid(uint256 loanId, address indexed borrower);
    event LoanDefaulted(uint256 loanId, address indexed borrower);

    modifier onlyBorrower(uint256 _loanId) {
        require(msg.sender == loans[_loanId].borrower, "Not the borrower");
        _;
    }

    function createLoan(uint256 _amount, uint256 _interestRate, uint256 _duration, uint256 _collateral) public {
        require(_amount > 0, "Loan amount must be greater than zero");
        require(_collateral >= _amount / 2, "Collateral must be at least 50% of the loan amount"); // Example collateral requirement

        loans[loanCount] = Loan({
            borrower: msg.sender,
            amount: _amount,
            interestRate: _interestRate,
            duration: _duration,
            startTime: block.timestamp,
            collateral: _collateral,
            isPaid: false
        });

        emit LoanCreated(loanCount, msg.sender, _amount, _interestRate, _duration, _collateral);
        loanCount++;
    }

    function payLoan(uint256 _loanId) public payable onlyBorrower(_loanId) {
        require(!loans[_loanId].isPaid, "Loan already paid");
        uint256 totalAmountDue = calculateTotalRepayment(_loanId);
        require(msg.value >= totalAmountDue, "Insufficient payment amount");

        // Logic for transferring collateral back to the borrower
        // (Assuming collateral is held in the contract, implement the logic to release it)

        loans[_loanId].isPaid = true;
        emit LoanPaid(_loanId, msg.sender);
    }

    function calculateTotalRepayment(uint256 _loanId) public view returns (uint256) {
        Loan memory loan = loans[_loanId];
        uint256 interest = (loan.amount * loan.interestRate * (block.timestamp - loan.startTime)) / (10000 * loan.duration);
        return loan.amount + interest;
    }

    function checkLoanStatus(uint256 _loanId) public view returns (string memory) {
        if (loans[_loanId].isPaid) {
            return "Loan is paid";
        } else if (block.timestamp > loans[_loanId].startTime + loans[_loanId].duration) {
            emit LoanDefaulted(_loanId, loans[_loanId].borrower);
            return "Loan is defaulted";
        } else {
            return "Loan is active";
        }
    }

    // Function to withdraw collateral in case of default (only callable by the lender)
    function withdrawCollateral(uint256 _loanId) public {
        require(block.timestamp > loans[_loanId].startTime + loans[_loanId].duration, "Loan is not defaulted yet");
        require(!loans[_loanId].isPaid, "Loan is already paid");

        // Logic to transfer collateral to the lender
        // (Implement the logic to handle collateral withdrawal)
    }
}
