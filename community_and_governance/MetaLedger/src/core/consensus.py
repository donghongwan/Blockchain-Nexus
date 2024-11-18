# consensus.py

import requests

class Consensus:
    def __init__(self, blockchain):
        self.blockchain = blockchain
        self.peers = set()

    def register_node(self, address):
        self.peers.add(address)

    def resolve_conflicts(self):
        longest_chain = None
        max_length = len(self.blockchain.chain)

        for peer in self.peers:
            response = requests.get(f'http://{peer}/chain')
            if response.status_code == 200:
                length = response.json()['length']
                chain = response.json()['chain']

                if length > max_length and self.valid_chain(chain):
                    max_length = length
                    longest_chain = chain

        if longest_chain:
            self.blockchain.chain = longest_chain
            return True
        return False

    @staticmethod
    def valid_chain(chain):
        last_block = chain[0]
        current_index = 1

        while current_index < len(chain):
            block = chain[current_index]
            if block['previous_hash'] != Blockchain.hash(last_block):
                return False
            last_block = block
            current_index += 1

        return True
