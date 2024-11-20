import hashlib
import json
from time import time
from transaction import Transaction

class Block:
    def __init__(self, index, previous_hash, timestamp, transactions):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.transactions = transactions
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        block_string = json.dumps(self.__dict__, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

class Blockchain:
    def __init__(self):
        self.chain = []
        self.current_transactions = []
        self.create_block(previous_hash='1')  # Genesis block

    def create_block(self, previous_hash):
        block = Block(
            index=len(self.chain) + 1,
            previous_hash=previous_hash,
            timestamp=time(),
            transactions=self.current_transactions
        )
        self.current_transactions = []  # Reset the current transactions
        self.chain.append(block)
        return block

    def add_transaction(self, transaction):
        self.current_transactions.append(transaction)
        if len(self.current_transactions) >= 1:  # Example: create a block after 1 transaction
            self.create_block(previous_hash=self.chain[-1].hash)

    def to_json(self):
        return json.dumps([block.__dict__ for block in self.chain], default=str)
