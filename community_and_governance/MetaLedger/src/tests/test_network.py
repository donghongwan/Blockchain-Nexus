# test_network.py

import unittest
from network import Network

class TestNetwork(unittest.TestCase):
    def setUp(self):
        self.network = Network()

    def test_add_peer(self):
        self.network.add_peer("192.168.1.1")
        self.assertIn("192.168.1.1", self.network.peers)

    def test_remove_peer(self):
        self.network.add_peer("192.168.1.1")
        self.network.remove_peer("192.168.1.1")
        self.assertNotIn("192.168.1.1", self.network.peers)

    def test_broadcast_message(self):
        self.network.add_peer("192.168.1.1")
        self.network.add_peer("192.168.1.2")
        message = "Hello, peers!"
        responses = self.network.broadcast(message)
        self.assertEqual(len(responses), 2)  # Assuming both peers respond

if __name__ == '__main__':
   unittest.main()
