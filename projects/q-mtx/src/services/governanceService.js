// services/governanceService.js
class GovernanceService {
    constructor() {
        this.proposals = [];
    }

    createProposal(title, description) {
        const newProposal = { id: this.proposals.length + 1, title, description, status: 'pending', votes: { yes: 0, no: 0 } };
        this.proposals.push(newProposal);
        return newProposal;
    }

    getProposals() {
        return this.proposals;
    }

    voteOnProposal(id, vote) {
        const proposal = this.proposals.find(p => p.id === id);
        if (!proposal) throw new Error('Proposal not found');
        proposal.votes[vote] += 1;
        return proposal;
    }
}

export default new GovernanceService();
