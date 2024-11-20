import uuid
from time import time

class Transaction:
    def __init__(self, sender, recipient, amount):
        self.transaction_id = str(uuid.uuid4())
        self.sender = sender
        self.recipient = recipient
        self.amount = amount
        self.timestamp = time()

    def to_json(self):
        return {
            'transaction_id': self.transaction_id,
            'sender': self.sender,
            'recipient': self.recipient,
            'amount': self.amount,
            'timestamp': self.timestamp
        }
