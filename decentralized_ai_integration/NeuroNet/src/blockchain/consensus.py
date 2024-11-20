import hashlib
import json
from blockchain import Blockchain

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
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:4] == "0000"  # Example: Difficulty level

    def resolve_conflicts(self):
        # Logic to resolve conflicts in the blockchain
        pass
