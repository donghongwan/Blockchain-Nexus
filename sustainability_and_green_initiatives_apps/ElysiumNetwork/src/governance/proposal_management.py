class Proposal:
    def __init__(self, title, description, proposer):
        self.title = title
        self.description = description
        self.proposer = proposer
        self.votes = {}
        self.closed = False

    def add_vote(self, voter_id, vote):
        if voter_id in self.votes:
            raise Exception("Voter has already voted.")
        self.votes[voter_id] = vote

    def tally_votes(self):
        yes_votes = sum(1 for vote in self.votes.values() if vote == 'yes')
        no_votes = sum(1 for vote in self.votes.values() if vote == 'no')
        return {'yes': yes_votes, 'no': no_votes}

    def close_proposal(self):
        self.closed = True

    def is_closed(self):
        return self.closed
