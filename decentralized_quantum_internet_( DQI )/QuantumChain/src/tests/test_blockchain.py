import unittest
from src.blockchain import Blockchain  # Assuming you have a Blockchain class in src/blockchain.py

class TestBlockchain(unittest.TestCase):
    def setUp(self):
        self.blockchain = Blockchain()

    def test_initial_chain(self):
        self.assertEqual(len(self.blockchain.chain), 1)  # Check that the chain starts with the genesis block

    def test_add_block(self):
        previous_length = len(self.blockchain.chain)
        self.blockchain.add_block(data="Test Block")
        self.assertEqual(len(self.blockchain.chain), previous_length + 1)  # Check that a new block is added

    def test_block_data(self):
        self.blockchain.add_block(data="Test Block")
        block = self.blockchain.chain[-1]
        self.assertEqual(block.data, "Test Block")  # Check that the block contains the correct data

if __name__ == '__main__':
    unittest.main()
