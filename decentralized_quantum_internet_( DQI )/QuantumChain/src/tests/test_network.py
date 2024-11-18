import unittest
from src.network.p2p_network import P2PNetwork  # Adjust import as necessary
from src.network.node import Node  # Adjust import as necessary

class TestP2PNetwork(unittest.TestCase):
    def setUp(self):
        self.network = P2PNetwork(port=5001)  # Start a P2P network on a different port for testing
        self.node_address = ('localhost', 5002)
        self.node = Node(self.node_address)

    def test_add_node(self):
        self.network.add_node(self.node_address)
        self.assertIn(self.node_address, self.network.nodes)  # Check that the node was added

    def test_broadcast_message(self):
        self.network.add_node(self.node_address)
        message = {'type': 'new_transaction', 'content': 'Test Transaction'}
        self.network.broadcast(message)  # This will not have a direct assertion but should not raise an error

    def test_handle_client(self):
        # Simulate a client connection and message handling
        self.network.add_node(self.node_address)
        self.node.connect()
        self.node.send_message({'type': 'new_block', 'content': 'Test Block'})  # This should not raise an error

if __name__ == '__main__':
    unittest.main()
