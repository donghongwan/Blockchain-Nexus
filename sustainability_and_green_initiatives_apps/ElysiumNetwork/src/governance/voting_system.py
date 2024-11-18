class VotingSystem:
    def __init__(self, governance_model):
        self.governance_model = governance_model

    def cast_vote(self, proposal, voter_id, vote):
        if not self.governance_model.is_voter_registered(voter_id):
            raise Exception("Voter not registered.")
        if proposal.is_closed():
            raise Exception("Voting for this proposal is closed.")
        
        proposal.add_vote(voter_id, vote)

    def tally_votes(self, proposal):
        if proposal.is_closed():
            return proposal.tally_votes()
        raise Exception("Voting is still open.")
