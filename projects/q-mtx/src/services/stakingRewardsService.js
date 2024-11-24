// services/stakingRewardsService.js
class StakingRewardsService {
    constructor() {
        this.stakingRewards = {};
    }

    getRewards(userId) {
        return { userId, rewards: this.stakingRewards[userId] || 0 };
    }

    updateRewards(userId, rewards) {
        this.stakingRewards[userId] = rewards;
        return { message: 'Staking rewards updated', userId, rewards };
    }
}

export default new StakingRewardsService();
