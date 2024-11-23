// smart_contracts/prediction_market_contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PredictionMarket {
    enum Outcome { None, OptionA, OptionB }

    struct Market {
        string description; // Description of the event
        uint256 totalBets; // Total amount of bets placed
        uint256 totalOptionA; // Total amount bet on Option A
        uint256 totalOptionB; // Total amount bet on Option B
        Outcome resolvedOutcome; // Resolved outcome of the market
        bool isResolved; // Whether the market has been resolved
    }

    IERC20 public token; // The token used for betting
    mapping(uint256 => Market) public markets; // Mapping of market ID to Market
    uint256 public marketCount; // Counter for markets

    event MarketCreated(uint256 indexed marketId, string description);
    event BetPlaced(uint256 indexed marketId, Outcome outcome, uint256 amount);
    event MarketResolved(uint256 indexed marketId, Outcome outcome);

    constructor(IERC20 _token) {
        token = _token;
    }

    // Function to create a new market
    function createMarket(string memory _description) external {
        marketCount++;
        markets[marketCount] = Market({
            description: _description,
            totalBets: 0,
            totalOptionA: 0,
            totalOptionB: 0,
            resolvedOutcome: Outcome.None,
            isResolved: false
        });

        emit MarketCreated(marketCount, _description);
    }

    // Function to place a bet on a specific outcome
    function placeBet(uint256 _marketId, Outcome _outcome, uint256 _amount) external {
        Market storage market = markets[_marketId];
        require(!market.isResolved, "Market is already resolved");
        require(_amount > 0, "Bet amount must be greater than zero");

        // Transfer the bet amount from the user to the contract
        token.transferFrom(msg.sender, address(this), _amount);

        // Update market data
        market.totalBets += _amount;
        if (_outcome == Outcome.OptionA) {
            market.totalOptionA += _amount;
        } else if (_outcome == Outcome.OptionB) {
            market.totalOptionB += _amount;
        }

        emit BetPlaced(_marketId, _outcome, _amount);
    }

    // Function to resolve the market
    function resolveMarket(uint256 _marketId, Outcome _outcome) external {
        Market storage market = markets[_marketId];
        require(!market.isResolved, "Market is already resolved");
        require(_outcome == Outcome.OptionA || _outcome == Outcome.OptionB, "Invalid outcome");

        market.resolvedOutcome = _outcome;
        market.isResolved = true;

        emit MarketResolved(_marketId, _outcome);
    }

    // Function to claim winnings
    function claimWinnings(uint256 _marketId) external {
        Market storage market = markets[_marketId];
        require(market.isResolved, "Market is not resolved");

        uint256 winnings = 0;
        if (market.resolvedOutcome == Outcome.OptionA) {
            winnings = (market.totalBets * market.totalOptionA) / market.totalBets;
        } else if (market.resolvedOutcome == Outcome.OptionB) {
            winnings = (market.totalBets * market.totalOptionB) / market.totalBets;
        }

        require(winnings > 0, "No winnings to claim");

        // Transfer winnings to the user
        token.transfer(msg.sender, winnings);
    }

    // Function to get market details
    function getMarket(uint256 _marketId) external view returns (string memory description, uint256 totalBets, uint256 totalOptionA, uint256 totalOptionB, Outcome resolvedOutcome, bool isResolved) {
        Market storage market = markets[_marketId];
        return (market.description, market.totalBets, market.totalOptionA, market.totalOptionB, market.resolvedOutcome, market.isResolved);
    }
}
