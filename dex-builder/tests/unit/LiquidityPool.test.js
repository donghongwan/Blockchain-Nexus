// tests/unit/LiquidityPool.test.js
const Token = artifacts.require("Token");
const LiquidityPool = artifacts.require("LiquidityPool");

contract("LiquidityPool", (accounts) => {
    let token;
    let pool;
    const [owner, user1] = accounts;

    beforeEach(async () => {
        token = await Token.new("Advanced Token", "ATK");
        pool = await LiquidityPool.new(token.address);
    });

    it("should add liquidity", async () => {
        await token.mint(user1, 1000);
        await token.approve(pool.address, 1000, { from: user1 });
        await pool.addLiquidity(500, { from: user1 });

        const liquidity = await pool.liquidityProviders(user1);
        assert.equal(liquidity.toString(), "500", "Liquidity not added correctly");
    });

    it("should remove liquidity", async () => {
        await token.mint(user1, 1000);
        await token.approve(pool.address, 1000, { from: user1 });
        await pool.addLiquidity(500, { from: user1 });
        await pool.removeLiquidity(200, { from: user1 });

        const liquidity = await pool.liquidityProviders(user1);
        assert.equal(liquidity.toString(), "300", "Liquidity not removed correctly");
    });
});
