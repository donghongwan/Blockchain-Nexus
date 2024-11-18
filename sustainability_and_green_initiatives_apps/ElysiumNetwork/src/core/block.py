class Block:
    def __init__(self, index, timestamp, transactions, proof, previous_hash):
        self.index = index
        self.timestamp = timestamp
        self.transactions = transactions
        self.proof = proof
        self.previous_hash = previous_hash

    def __repr__(self):
        return f"Block(index={self.index}, transactions={self.transactions}, proof={self.proof}, previous_hash='{self.previous_hash}')"
