import unittest
from carbon_credit_dapp import app as carbon_credit_app
from energy_sharing_dapp import app as energy_sharing_app

class TestDApps(unittest.TestCase):
    def setUp(self):
        self.carbon_credit_client = carbon_credit_app.test_client()
        self.energy_sharing_client = energy_sharing_app.test_client()

    def test_mint_credit(self):
        response = self.carbon_credit_client.post('/mint', json={'user_id': 'user1', 'amount': 10})
        self.assertEqual(response.status_code, 201)

    def test_transfer_credit(self):
        self.carbon_credit_client.post('/mint', json={'user _id': 'user1', 'amount': 10})
        response = self.carbon_credit_client.post('/transfer', json={'from': 'user1', 'to': 'user2', 'amount': 5})
        self.assertEqual(response.status_code, 200)

    def test_energy_offer(self):
        response = self.energy_sharing_client.post('/offer', json={'seller_id': 'seller1', 'amount': 100, 'price': 0.05})
        self.assertEqual(response.status_code, 201)

    def test_buy_energy(self):
        self.energy_sharing_client.post('/offer', json={'seller_id': 'seller1', 'amount': 100, 'price': 0.05})
        response = self.energy_sharing_client.post('/buy', json={'buyer_id': 'buyer1', 'offer_id': 0})
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
