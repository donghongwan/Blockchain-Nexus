class Transaction:
    def __init__(self, sender, recipient, amount):
        self.sender = sender
        self.recipient = recipient
        self.amount = amount
        self.signature = None

    def sign_transaction(self, private_key):
        # Implement signing logic using the sender's private key
        self.signature = self._sign(private_key)

    def _sign(self, private_key):
        # Placeholder for actual signing logic
        return "signed_transaction"

    def is_valid(self):
        # Implement validation logic for the transaction
        return self.signature is not None
