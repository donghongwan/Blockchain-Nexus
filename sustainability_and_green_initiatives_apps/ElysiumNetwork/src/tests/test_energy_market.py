import unittest
from energy_market import EnergyMarket

class TestEnergyMarket(unittest.TestCase):
    def setUp(self):
        self.energy_market = EnergyMarket()

    def test_list_offer(self):
        self.energy_market.list_offer("seller1", 100, 0.05)
        self.assertEqual(len(self.energy_market.energy_offers), 1)

    def test_buy_energy(self):
        self.energy_market.list_offer("seller1", 100, 0.05)
        message = self.energy_market.buy_energy("buyer1", 0)
        self.assertEqual(message, "Energy purchased successfully.")
        self.assertEqual(len(self.energy_market.energy_offers), 0)

    def test_buy_nonexistent_offer(self):
        with self.assertRaises(Exception):
            self.energy_market.buy_energy("buyer1", 0)

if __name__ == '__main__':
    unittest.main()
