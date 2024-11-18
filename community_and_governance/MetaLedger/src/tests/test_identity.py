# test_identity.py

import unittest
from decentralized_identity import DecentralizedIdentity

class TestDecentralizedIdentity(unittest.TestCase):
    def setUp(self):
        self.identity_manager = DecentralizedIdentity()

    def test_create_identity(self):
        identity = self.identity_manager.create_identity("user1")
        self.assertIn("user1", self.identity_manager.identities)

    def test_sign_and_verify(self):
        identity = self.identity_manager.create_identity("user1")
        data = "Important Data"
        signature = self.identity_manager.sign_data("user1", data)
        self.assertTrue(self.identity_manager.verify_signature("user1", data, signature))

    def test_invalid_signature(self):
        identity = self.identity_manager.create_identity("user1")
        data = "Important Data"
        signature = self.identity_manager.sign_data("user1", data)
        self.assertFalse(self.identity_manager.verify_signature("user1", "Different Data", signature))

if __name__ == '__main__':
    unittest.main()
