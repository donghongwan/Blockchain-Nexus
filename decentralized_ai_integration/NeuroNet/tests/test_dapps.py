import unittest
from dapps.example_dapp.app import app

class TestDApps(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_create_transaction(self):
        response = self.app.post('/api/example_dapp/transaction', json={
            'sender': 'Alice',
            'recipient': 'Bob',
            'amount': 50
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('Transaction added', response.get_data(as_text=True))

    def test_get_blockchain(self):
        response = self.app.get('/api/example_dapp/blockchain')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)  # Assuming the blockchain is a list of blocks

if __name__ == '__main__':
    unittest.main()
