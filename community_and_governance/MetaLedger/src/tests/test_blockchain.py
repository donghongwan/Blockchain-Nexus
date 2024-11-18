# test_blockchain.py

import unittest
from blockchain import Blockchain

class TestBlockchain(unittest.TestCase):
    def setUp(self):
        self.blockchain = Blockchain()

    def test_initialization(self):
        self.assertEqual(len(self.blockchain.chain), 1)  # Genesis block

    def test_add_block(self):
        previous_length = len(self.blockchain.chain)
        self.blockchain.add_block(data="Test Block")
        self.assertEqual(len(self.blockchain.chain), previous_length + 1)

    def test_block_integrity(self):
        self.blockchain.add_block(data="Test Block")
        block = self.blockchain.chain[-1]
        self.assertEqual(block['previous_hash'], self.blockchain.chain[-2]['hash'])

    def test_invalid_blockchain(self):
        self.blockchain.chain[1]['data'] = "Tampered Data"
        self.assertFalse(self.blockchain.is_valid_chain())

if __name__ == '__main__':
    unittest.main()
