# proposal_management.py

class Proposal:
    def __init__(self, proposal_id, title, description, proposer):
        self.proposal_id = proposal_id
        self.title = title
        self.description = description
        self.proposer = proposer
        self.status = 'pending'  # can be 'pending', 'approved', 'rejected'
        self.votes = {}

    def add_vote(self, user_id, vote_value):
        self.votes[user_id] = vote_value

    def get_vote_count(self):
        return len(self.votes)

class ProposalManagement:
    def __init__(self):
        self.proposals = {}

    def create_proposal(self, title, description, proposer):
        proposal_id = len(self.proposals) + 1
        proposal = Proposal(proposal_id, title, description, proposer)
        self.proposals[proposal_id] = proposal
        return proposal

    def get_proposal(self, proposal_id):
        return self.proposals.get(proposal_id)

    def vote_on_proposal(self, proposal_id, user_id, vote_value):
        proposal = self.get_proposal(proposal_id)
        if proposal:
            proposal.add_vote(user_id, vote_value)
            return True
        return False

    def finalize_proposal(self, proposal_id):
        proposal = self.get_proposal(proposal_id)
        if proposal:
            # Logic to determine if the proposal is approved or rejected
            if proposal.get_vote_count() > 5:  # Example threshold
                proposal.status = 'approved'
            else:
                proposal.status = 'rejected'
            return proposal.status
        return None
