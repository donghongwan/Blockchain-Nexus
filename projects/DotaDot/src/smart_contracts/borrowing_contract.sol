// smart_contracts/borrowing_contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./lending_contract.sol"; // Import the LendingContract for reference

contract BorrowingContract {
    struct Borrowing {
        address lender;
        uint256 loanId; // Reference to the loan in the LendingContract
        uint256 amount;
        uint256 interestRate; // Interest rate in basis points
        uint256 duration; // Duration in seconds
        uint256 startTime; // Timestamp when the loan was taken
        bool isRepaid; // Repayment status
    }

    mapping(uint256 => Borrowing) public borrowings;
    uint256 public borrowingCount;

    event BorrowingCreated(uint256 borrowingId, address indexed borrower, uint256 loanId, uint256 amount, uint256 interestRate, uint256 duration);
    event BorrowingRepaid(uint256 borrowingId, address indexed borrower);

    modifier onlyLender(uint256 _borrowingId) {
        require(msg.sender == borrowings[_borrowingId].lender, "Not the lender");
        _;
    }

    function createBorrowing(uint256 _loanId, address _lender) public {
        LendingContract lendingContract = LendingContract(_lender);
        require(lendingContract.loans(_loanId).borrower() == msg.sender, "Not the borrower of this loan");
        
        uint256 amount = lendingContract.loans(_loanId).amount();
        uint256 interestRate = lendingContract.loans(_loanId).interestRate();
        uint256 duration = lendingContract.loans(_loanId).duration();

        borrowings[borrowingCount] = Borrowing({
            lender: _lender,
            loanId: _loanId,
            amount: amount,
            interestRate: interestRate,
            duration: duration,
            startTime: block.timestamp,
            isRepaid: false
        });

        emit BorrowingCreated(borrowingCount, msg.sender, _loanId, amount, interestRate, duration);
        borrowingCount++;
    }

    function repayBorrowing(uint256 _borrowingId) public payable {
        require(!borrowings[_borrowingId].isRepaid, "Borrowing already repaid");
        uint256 totalAmountDue = calculateTotalRepayment(_borrowingId);
        require(msg.value >= totalAmountDue, "Insufficient payment amount");

        // Logic for transferring funds to the lender
        payable(borrowings[_borrowingId].lender).transfer(msg.value);

        borrowings[_borrowingId].isRepaid = true;
        emit BorrowingRepaid(_borrowingId, msg.sender);
    }

    function calculateTotalRepayment(uint256 _borrowingId) public view returns (uint256) {
        Borrowing memory borrowing = borrowings[_borrowingId];
        uint256 interest = (borrowing.amount * borrowing.interestRate * (block.timestamp - borrowing.startTime)) / (10000 * borrowing.duration);
        return borrowing.amount + interest;
    }

    function checkBorrowingStatus(uint256 _borrowingId) public view returns (string memory) {
        if (borrowings[_borrowingId].isRepaid) {
            return "Borrowing is repaid";
        } else {
            return "Borrowing is active";
        }
    }
}
