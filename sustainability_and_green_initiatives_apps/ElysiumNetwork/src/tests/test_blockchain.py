import unittest
from blockchain import Blockchain

class TestBlockchain(unittest.TestCase):
    def setUp(self):
        self.blockchain = Blockchain()

    def test_initial_chain(self):
        self.assertEqual(len(self.blockchain.chain), 1)  # Genesis block

    def test_add_block(self):
        previous_length = len(self.blockchain.chain)
        self.blockchain.add_block(data="Test Block")
        self.assertEqual(len(self.blockchain.chain), previous_length + 1)

    def test_valid_chain(self):
        self.blockchain.add_block(data="Test Block 1")
        self.blockchain.add_block(data="Test Block 2")
        self.assertTrue(self.blockchain.is_chain_valid())

    def test_invalid_chain(self):
        self.blockchain.chain[1].data = "Tampered Data"
        self.assertFalse(self.blockchain.is_chain_valid())

if __name__ == '__main__':
    unittest.main()
