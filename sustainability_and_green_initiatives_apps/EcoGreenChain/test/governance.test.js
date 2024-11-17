const EcoGreenChainGovernance = artifacts.require("EcoGreenChainGovernance");

contract("EcoGreenChainGovernance", (accounts) => {
    let governanceInstance;
    const owner = accounts[0];

    beforeEach(async () => {
        governanceInstance = await EcoGreenChainGovernance.new();
    });

    it("should create a governance proposal", async () => {
        await governanceInstance.createProposal("Proposal to increase carbon credit limit", { from: owner });
        const proposal = await governanceInstance.proposals(1);
        assert.equal(proposal.description, "Proposal to increase carbon credit limit", "The proposal description should match");
        assert.equal(proposal.voteCount.toString(), '0', "The initial vote count should be 0");
        assert.isTrue(proposal.isActive, "The proposal should be active");
    });

    it("should allow voting on a proposal", async () => {
        await governanceInstance.createProposal("Proposal to increase carbon credit limit", { from: owner });
        await governanceInstance.vote(1, true, { from: accounts[1] });
        const proposal = await governanceInstance.proposals(1);
        assert.equal(proposal.voteCount.toString(), '1', "The vote count should be 1 after voting");
    });

    it("should not allow double voting", async () => {
        await governanceInstance.createProposal("Proposal to increase carbon credit limit", { from: owner });
        await governanceInstance.vote(1, true, { from: accounts[1] });
        try {
            await governanceInstance.vote(1, true, { from: accounts[1] });
            assert.fail("Expected error not received");
        } catch (error) {
            assert.include(error.message, "Already voted", "Error message should contain 'Already voted'");
        }
    });

    it("should deactivate a proposal", async () => {
        await governanceInstance.createProposal("Proposal to increase carbon credit limit", { from: owner });
        await governanceInstance.deactivateProposal(1, { from: owner });
        const proposal = await governanceInstance.proposals(1);
        assert.isFalse(proposal.isActive, "The proposal should be deactivated");
    });
});
