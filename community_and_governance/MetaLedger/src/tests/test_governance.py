# test_governance.py

import unittest
from governance_model import GovernanceModel
from voting_system import VotingSystem
from proposal_management import ProposalManagement

class TestGovernance(unittest.TestCase):
    def setUp(self):
        self.governance_model = GovernanceModel()
        self.voting_system = VotingSystem(self.governance_model)
        self.proposal_management = ProposalManagement()

    def test_create_proposal(self):
        proposal = self.proposal_management.create_proposal("Test Proposal", "Description", "Proposer")
        self.assertEqual(proposal.title, "Test Proposal")

    def test_vote_on_proposal(self):
        proposal = self.proposal_management.create_proposal("Test Proposal", "Description", "Proposer")
        self.proposal_management.vote_on_proposal(proposal.proposal_id, "user1", True)
        self.assertEqual(len(proposal.votes), 1)

    def test_finalize_proposal(self):
        proposal = self.proposal_management.create_proposal("Test Proposal", "Description", "Proposer")
        for i in range(6):  # Simulate 6 votes
            self.proposal_management.vote_on_proposal(proposal.proposal_id, f"user{i}", True)
        status = self.proposal_management.finalize_proposal(proposal.proposal_id)
        self.assertEqual(status, 'approved')

if __name__ == '__main__':
    unittest.main()
