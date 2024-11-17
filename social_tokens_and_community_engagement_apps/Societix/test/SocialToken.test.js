// test/SocialToken.test.js

const SocialToken = artifacts.require("SocialToken");

contract("SocialToken", (accounts) => {
    let token;

    before(async () => {
        token = await SocialToken.new("Societix Token", "SCT", 1000000);
    });

    it("should have the correct name and symbol", async () => {
        const name = await token.name();
        const symbol = await token.symbol();
        assert.equal(name, "Societix Token", "Token name is incorrect");
        assert.equal(symbol, "SCT", "Token symbol is incorrect");
    });

    it("should assign the total supply to the creator", async () => {
        const balance = await token.balanceOf(accounts[0]);
        assert.equal(balance.toString(), "1000000", "Total supply not assigned to the creator");
    });
});
