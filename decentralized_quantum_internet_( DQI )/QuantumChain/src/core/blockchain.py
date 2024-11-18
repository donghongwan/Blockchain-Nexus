import hashlib
import json
from time import time
from .block import Block
from .transaction import Transaction
from .consensus import Consensus
from .identity import IdentityManager
from .logger import Logger

class Blockchain:
    def __init__(self):
        self.chain = []
        self.current_transactions = []
        self.identity_manager = IdentityManager()
        self.consensus = Consensus(self)
        self.logger = Logger()
        self.create_block(previous_hash='1', proof=100)  # Genesis block

    def create_block(self, proof, previous_hash=None):
        block = Block(index=len(self.chain) + 1,
                      timestamp=time(),
                      transactions=self.current_transactions,
                      proof=proof,
                      previous_hash=previous_hash or self.hash(self.chain[-1]))
        self.current_transactions = []  # Reset the current transactions
        self.chain.append(block)
        self.logger.info(f'Block {block.index} created.')
        return block

    def create_transaction(self, sender, recipient, amount):
        transaction = Transaction(sender, recipient, amount)
        transaction.sign_transaction(sender.private_key)  # Assuming sender has a private_key attribute
        self.current_transactions.append(transaction)
        self.logger.info(f'Transaction created: {transaction.to_dict()}')
        return self.last_block.index + 1  # Return the index of the block that will hold this transaction

    @property
    def last_block(self):
        return self.chain[-1]

    @staticmethod
    def hash(block):
        block_string = json.dumps(block.to_dict(), sort_keys=True).encode()
        return hashlib.sha3_256(block_string).hexdigest()

    def add_identity(self, user_id, public_key):
        self.identity_manager.add_identity(user_id, public_key)

    def verify_identity(self, user_id, signature):
        return self.identity_manager.verify_identity(user_id, signature)
