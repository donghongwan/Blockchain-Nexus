// tests/unit/Token.test.js
const Token = artifacts.require("Token");

contract("Token", (accounts) => {
    let token;
    const [owner, user1] = accounts;

    beforeEach(async () => {
        token = await Token.new("Advanced Token", "ATK");
    });

    it("should mint tokens", async () => {
        await token.mint(user1, 1000);
        const balance = await token.balanceOf(user1);
        assert.equal(balance.toString(), "1000", "Minting failed");
    });

    it("should burn tokens", async () => {
        await token.mint(user1, 1000);
        await token.burn(500, { from: user1 });
        const balance = await token.balanceOf(user1);
        assert.equal(balance.toString(), "500", "Burning failed");
    });
});
