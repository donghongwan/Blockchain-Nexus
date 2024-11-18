import hashlib
import json

class Consensus:
    def __init__(self, blockchain):
        self.blockchain = blockchain

    def proof_of_work(self, last_proof):
        proof = 0
        while not self.valid_proof(last_proof, proof):
            proof += 1
        return proof

    @staticmethod
    def valid_proof(last_proof, proof):
        guess = f'{last_proof}{proof}'.encode()
        guess_hash = hashlib.sha3_256(guess).hexdigest()
        return guess_hash[:4] == "0000"  # Example difficulty level

    def resolve_conflicts(self, other_chains):
        longest_chain = self.blockchain.chain
        for chain in other_chains:
            if len(chain) > len(longest_chain):
                longest_chain = chain
        self.blockchain.chain = longest_chain
