import os
from blockchain.node import Node

def run_node(node_id, node_port):
    node = Node(node_id, node_port)
    node.start()

if __name__ == "__main__":
    run_node("node1", 8545)
