import unittest
from governance_model import GovernanceModel
from proposal_management import Proposal

class TestGovernance(unittest.TestCase):
    def setUp(self):
        self.governance_model = GovernanceModel()

    def test_add_proposal(self):
        proposal = Proposal("Test Proposal", "Description", "proposer1")
        self.governance_model.add_proposal(proposal)
        self.assertEqual(len(self.governance_model.proposals), 1)

    def test_register_voter(self):
        self.governance_model.register_voter("voter1")
        self.assertTrue(self.governance_model.is_voter_registered("voter1"))

    def test_active_proposals(self):
        proposal = Proposal("Test Proposal", "Description", "proposer1")
        self.governance_model.add_proposal(proposal)
        self.assertEqual(len(self.governance_model.get_active_proposals()), 1)

if __name__ == '__main__':
    unittest.main()
