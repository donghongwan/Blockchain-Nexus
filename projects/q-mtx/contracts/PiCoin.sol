// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract PiCoin is ERC20, Ownable, Pausable {
    using SafeMath for uint256;

    // Governance structure
    struct Proposal {
        string description;
        uint256 voteCount;
        mapping(address => bool) voters;
        bool executed;
    }

    Proposal[] public proposals;
    uint256 public proposalCount;

    // Staking rewards
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public lastClaimed;
    uint256 public rewardRate = 100; // Reward rate per block

    // Transfer tax
    uint256 public transferTaxRate = 5; // 5% transfer tax
    address public taxRecipient; // Address to receive tax

    // Price management
    uint256 public targetPrice = 314159; // Target price in cents ($314.159)
    uint256 public adjustmentFactor = 5; // Factor to adjust supply (5% for example)
    address public priceOracle; // Address of the price oracle

    event ProposalCreated(uint256 indexed proposalId, string description);
    event Voted(uint256 indexed proposalId, address indexed voter);
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event TaxRateUpdated(uint256 newRate);
    event TaxRecipientUpdated(address newRecipient);
    event SupplyAdjusted(uint256 newSupply);

    constructor(address _taxRecipient, address _priceOracle) ERC20("PiCoin", "PI") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals()); // Initial supply
        taxRecipient = _taxRecipient;
        priceOracle = _priceOracle;
    }

    // Governance functions
    function createProposal(string memory _description) external onlyOwner {
        Proposal storage newProposal = proposals.push();
        newProposal.description = _description;
        newProposal.voteCount = 0;
        proposalCount++;
        emit ProposalCreated(proposalCount - 1, _description);
    }

    function vote(uint256 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.voters[msg.sender], "Already voted");
        proposal.voters[msg.sender] = true;
        proposal.voteCount++;
        emit Voted(_proposalId, msg.sender);
    }

    function executeProposal(uint256 _proposalId) external onlyOwner {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.executed, "Proposal already executed");
        // Logic to execute the proposal
        proposal.executed = true;
    }

    // Staking functions
    function stake(uint256 _amount) external whenNotPaused {
        require(_amount > 0, "Amount must be greater than 0");
        _transfer(msg.sender, address(this), _amount);
        stakedAmount[msg.sender] = stakedAmount[msg.sender].add(_amount);
        lastClaimed[msg.sender] = block.number;
        emit Staked(msg.sender, _amount);
    }

    function unstake(uint256 _amount) external whenNotPaused {
        require(stakedAmount[msg.sender] >= _amount, "Insufficient staked amount");
        claimRewards();
        stakedAmount[msg.sender] = stakedAmount[msg.sender].sub(_amount);
        _transfer(address(this), msg.sender, _amount);
        emit Unstaked(msg.sender, _amount);
    }

    function claimRewards() public {
        uint256 rewards = calculateRewards(msg.sender);
        lastClaimed[msg.sender] = block.number;
        _mint(msg.sender, rewards);
        emit RewardsClaimed(msg.sender, rewards);
    }

    function calculateRewards(address _user) public view returns (uint256) {
        uint256 staked = stakedAmount[_user];
        uint256 blocksStaked = block.number.sub(lastClaimed[_user]);
        return staked.mul(rewardRate).mul(blocksStaked);
    }

    // Burn function
    function burn(uintuint256 _amount) external {
        _burn(msg.sender, _amount);
    }

    // Transfer function with tax
    function _transfer(address sender, address recipient, uint256 amount) internal override {
        uint256 tax = amount.mul(transferTaxRate).div(100);
        uint256 amountAfterTax = amount.sub(tax);
        super._transfer(sender, recipient, amountAfterTax);
        super._transfer(sender, taxRecipient, tax); // Transfer tax to recipient
    }

    // Adjust supply based on price
    function adjustSupply() external {
        PriceOracle oracle = PriceOracle(priceOracle);
        uint256 currentPrice = oracle.getCurrentPrice();
        if (currentPrice < targetPrice) {
            uint256 mintAmount = totalSupply().mul(adjustmentFactor).div(100);
            _mint(address(this), mintAmount); // Mint new tokens
            emit SupplyAdjusted(totalSupply());
        } else if (currentPrice > targetPrice) {
            uint256 burnAmount = totalSupply().mul(adjustmentFactor).div(100);
            _burn(address(this), burnAmount); // Burn tokens
            emit SupplyAdjusted(totalSupply());
        }
    }

    // Update tax rate
    function updateTaxRate(uint256 _newRate) external onlyOwner {
        transferTaxRate = _newRate;
        emit TaxRateUpdated(_newRate);
    }

    // Update tax recipient
    function updateTaxRecipient(address _newRecipient) external onlyOwner {
        taxRecipient = _newRecipient;
        emit TaxRecipientUpdated(_newRecipient);
    }

    // Pause and unpause contract
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
