// dao-example/index.js

class DAO {
    constructor() {
        this.members = new Set();
        this.proposals = [];
    }

    addMember(member) {
        this.members.add(member);
        console.log(`${member} has joined the DAO.`);
    }

    createProposal(description) {
        const proposal = { description, votes: 0 };
        this.proposals.push(proposal);
        console.log(`Proposal created: ${description}`);
    }

    vote(proposalIndex) {
        if (proposalIndex < this.proposals.length) {
            this.proposals[proposalIndex].votes++;
            console.log(`Voted on proposal: ${this.proposals[proposalIndex].description}`);
        } else {
            console.log('Invalid proposal index.');
        }
    }

    getProposals() {
        return this.proposals;
    }
}

async function main() {
    const dao = new DAO();

    // Add members
    dao.addMember('Alice');
    dao.addMember('Bob');

    // Create proposals
    dao.createProposal('Increase the budget for marketing.');
    dao.createProposal('Develop a new feature.');

    // Vote on proposals
    dao.vote(0);
    dao.vote(1);

    console.log('Current Proposals:', dao.getProposals());
}

main().catch(console.error);
