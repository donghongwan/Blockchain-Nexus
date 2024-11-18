# voting_system.py

class VotingSystem:
    def __init__(self, governance_model):
        self.governance_model = governance_model
        self.votes = {}

    def cast_vote(self, user_id, proposal_id, vote_value):
        if proposal_id not in self.votes:
            self.votes[proposal_id] = {}
        self.votes[proposal_id][user_id] = vote_value

    def tally_votes(self, proposal_id):
        if proposal_id not in self.votes:
            return None
        return self.governance_model(self.votes[proposal_id])

    def get_results(self, proposal_id):
        results = self.tally_votes(proposal_id)
        if results is None:
            return "No votes cast for this proposal."
        return results
