// tests/unit/Staking.test.js
const Token = artifacts.require("Token");
const Staking = artifacts.require("Staking");

contract("Staking", (accounts) => {
    let token;
    let staking;
    const [owner, user1] = accounts;

    beforeEach(async () => {
        token = await Token.new("Advanced Token", "ATK");
        staking = await Staking.new(token.address);
    });

    it("should stake tokens", async () => {
        await token.mint(user1, 1000);
        await token.approve(staking.address, 1000, { from: user1 });
        await staking.stake(500, { from: user1 });

        const stakedAmount = await staking.stakedAmount(user1);
        assert.equal(stakedAmount.toString(), "500", "Staking failed");
    });

    it("should withdraw staked tokens", async () => {
        await token.mint(user1, 1000);
        await token.approve(staking.address, 1000, { from: user1 });
        await staking.stake(500, { from: user1 });
        await staking.withdraw(200, { from: user1 });

        const stakedAmount = await staking.stakedAmount(user1);
        assert.equal(stakedAmount.toString(), "300", "Withdrawal failed");
    });
});
