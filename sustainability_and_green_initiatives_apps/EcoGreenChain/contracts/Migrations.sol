// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Migrations is Ownable {
    uint256 public last_completed_migration;
    bool public paused;

    event MigrationPaused();
    event MigrationResumed();
    event MigrationCompleted(uint256 indexed completedMigration);

    modifier notPaused() {
        require(!paused, "Migrations are paused");
        _;
    }

    constructor() {
        last_completed_migration = 0;
        paused = false;
    }

    function setCompleted(uint256 completed) external onlyOwner notPaused {
        last_completed_migration = completed;
        emit MigrationCompleted(completed);
    }

    function pauseMigrations() external onlyOwner {
        paused = true;
        emit MigrationPaused();
    }

    function resumeMigrations() external onlyOwner {
        paused = false;
        emit MigrationResumed();
    }

    function getLastCompletedMigration() external view returns (uint256) {
        return last_completed_migration;
    }
}
