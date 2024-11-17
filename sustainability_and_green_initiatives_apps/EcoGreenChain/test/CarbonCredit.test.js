const CarbonCredit = artifacts.require("CarbonCredit");

contract("CarbonCredit", (accounts) => {
    let carbonCreditInstance;
    const owner = accounts[0];
    const recipient = accounts[1];

    beforeEach(async () => {
        carbonCreditInstance = await CarbonCredit.new();
    });

    it("should create a carbon credit", async () => {
        await carbonCreditInstance.createCredit(100, { from: owner });
        const credit = await carbonCreditInstance.credits(1);
        assert.equal(credit.amount.toString(), '100', "The credit amount should be 100");
        assert.equal(credit.owner, owner, "The owner should be the creator");
        assert.isTrue(credit.isActive, "The credit should be active");
    });

    it("should transfer a carbon credit", async () => {
        await carbonCreditInstance.createCredit(100, { from: owner });
        await carbonCreditInstance.transferCredit(1, recipient, { from: owner });
        const credit = await carbonCreditInstance.credits(1);
        assert.equal(credit.owner, recipient, "The credit owner should be the recipient");
    });

    it("should not allow non-owners to transfer credits", async () => {
        await carbonCreditInstance.createCredit(100, { from: owner });
        try {
            await carbonCreditInstance.transferCredit(1, recipient, { from: accounts[2] });
            assert.fail("Expected error not received");
        } catch (error) {
            assert.include(error.message, "Not the owner", "Error message should contain 'Not the owner'");
        }
    });

    it("should deactivate a carbon credit", async () => {
        await carbonCreditInstance.createCredit(100, { from: owner });
        await carbonCreditInstance.deactivateCredit(1, { from: owner });
        const credit = await carbonCreditInstance.credits(1);
        assert.isFalse(credit.isActive, "The credit should be deactivated");
    });
});
