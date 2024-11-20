import unittest
from blockchain.blockchain import Blockchain
from blockchain.transaction import Transaction

class TestBlockchain(unittest.TestCase):
    def setUp(self):
        self.blockchain = Blockchain()

    def test_create_transaction(self):
        transaction = Transaction("Alice", "Bob", 50)
        self.blockchain.add_transaction(transaction)
        self.assertEqual(len(self.blockchain.current_transactions), 1)
        self.assertEqual(self.blockchain.current_transactions[0].amount, 50)

    def test_mine_block(self):
        self.blockchain.add_transaction(Transaction("Alice", "Bob", 50))
        previous_length = len(self.blockchain.chain)
        self.blockchain.mine_block("miner_address")
        self.assertEqual(len(self.blockchain.chain), previous_length + 1)

    def test_chain_integrity(self):
        self.blockchain.add_transaction(Transaction("Alice", "Bob", 50))
        self.blockchain.mine_block("miner_address")
        self.assertTrue(self.blockchain.is_chain_valid())

if __name__ == '__main__':
    unittest.main()
