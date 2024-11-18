class GovernanceModel:
    def __init__(self):
        self.proposals = []
        self.voters = set()

    def add_proposal(self, proposal):
        self.proposals.append(proposal)

    def get_active_proposals(self):
        return [proposal for proposal in self.proposals if not proposal.is_closed()]

    def register_voter(self, voter_id):
        self.voters.add(voter_id)

    def is_voter_registered(self, voter_id):
        return voter_id in self.voters
