import unittest
from carbon_credit import CarbonCredit

class TestCarbonCredit(unittest.TestCase):
    def setUp(self):
        self.carbon_credit_system = CarbonCredit()

    def test_mint_credit(self):
        self.carbon_credit_system.mint_credit("user1", 10)
        self.assertEqual(self.carbon_credit_system.get_balance("user1"), 10)

    def test_transfer_credit(self):
        self.carbon_credit_system.mint_credit("user1", 10)
        self.carbon_credit_system.transfer_credit("user1", "user2", 5)
        self.assertEqual(self.carbon_credit_system.get_balance("user1"), 5)
        self.assertEqual(self.carbon_credit_system.get_balance("user2"), 5)

    def test_insufficient_balance(self):
        with self.assertRaises(Exception):
            self.carbon_credit_system.transfer_credit("user1", "user2", 5)

if __name__ == '__main__':
    unittest.main()
