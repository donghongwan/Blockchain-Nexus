// services/reputationSystemService.js
class ReputationSystemService {
    constructor() {
        this.reputations = {};
    }

    getReputation(userId) {
        return { userId, score: this.reputations[userId] || 0 };
    }

    updateReputation(userId, score) {
        this.reputations[userId] = score;
        return { message: 'Reputation score updated', userId, score };
    }
}

export default new ReputationSystemService();
