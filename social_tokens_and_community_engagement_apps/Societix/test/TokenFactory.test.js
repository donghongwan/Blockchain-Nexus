// test/TokenFactory.test.js

const TokenFactory = artifacts.require("TokenFactory");
const SocialToken = artifacts.require("SocialToken");

contract("TokenFactory", (accounts) => {
    let factory;

    before(async () => {
        factory = await TokenFactory.new();
    });

    it("should create a new token", async () => {
        await factory.createToken("New Token", "NTK", 1000000, { from: accounts[0] });
        const tokenAddress = await factory.tokens(0);
        const token = await SocialToken.at(tokenAddress);
        const name = await token.name();
        const symbol = await token.symbol();
        assert.equal(name, "New Token", "Token name is incorrect");
        assert.equal(symbol, "NTK", "Token symbol is incorrect");
    });

    it("should track the number of tokens created", async () => {
        const tokenCount = await factory.getTokenCount();
        assert.equal(tokenCount.toString(), "1", "Token count is incorrect");
    });
});
