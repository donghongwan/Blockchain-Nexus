// test/Governance.test.js

const Governance = artifacts.require("Governance");

contract("Governance", (accounts) => {
    let governance;

    before(async () => {
        governance = await Governance.new();
    });

    it("should allow a proposal to be created", async () => {
        await governance.createProposal("Proposal 1", { from: accounts[0] });
        const proposal = await governance.proposals(0);
        assert.equal(proposal.description, "Proposal 1", "Proposal description is incorrect");
    });

    it("should allow voting on a proposal", async () => {
        await governance.vote(0, true, { from: accounts[1] });
        const proposal = await governance.proposals(0);
        assert.equal(proposal.votesFor.toString(), "1", "Vote count is incorrect");
    });
});
