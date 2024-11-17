const RenewableEnergyCredit = artifacts.require("RenewableEnergyCredit");

contract("RenewableEnergyCredit", (accounts) => {
    let renewableEnergyCreditInstance;
    const owner = accounts[0];
    const recipient = accounts[1];

    beforeEach(async () => {
        renewableEnergyCreditInstance = await RenewableEnergyCredit.new();
    });

    it("should create a renewable energy credit", async () => {
        await renewableEnergyCreditInstance.createEnergyCredit(50, { from: owner });
        const credit = await renewableEnergyCreditInstance.energyCredits(1);
        assert.equal(credit.amount.toString(), '50', "The credit amount should be 50");
        assert.equal(credit.owner, owner, "The owner should be the creator");
        assert.isTrue(credit.isActive, "The credit should be active");
    });

    it("should transfer a renewable energy credit", async () => {
        await renewableEnergyCreditInstance.createEnergyCredit(50, { from: owner });
        await renewableEnergyCreditInstance.transferEnergyCredit(1, recipient, { from: owner });
        const credit = await renewableEnergyCreditInstance.energyCredits(1);
        assert.equal(credit.owner, recipient, "The credit owner should be the recipient");
    });

    it("should not allow non-owners to transfer credits", async () => {
        await renewableEnergyCreditInstance.createEnergyCredit(50, { from: owner });
        try {
            await renewableEnergyCreditInstance.transferEnergyCredit(1, recipient, { from: accounts[2] });
            assert.fail("Expected error not received");
        } catch (error) {
            assert.include(error.message, "Not the owner", "Error message should contain 'Not the owner'");
        }
    });

    it("should deactivate a renewable energy credit", async () => {
        await renewableEnergyCreditInstance.createEnergyCredit(50, { from: owner });
        await renewableEnergyCreditInstance.deactivateEnergyCredit(1, { from: owner });
        const credit = await renewableEnergyCreditInstance.energyCredits(1);
        assert.isFalse(credit.isActive, "The credit should be deactivated");
    });
});
