# cross_chain.py

import requests

class CrossChain:
    def __init__(self, blockchain):
        self.blockchain = blockchain

    def initiate_cross_chain_transaction(self, sender, recipient, amount, target_chain_url):
        # Create a transaction in the local blockchain
        transaction_id = self.blockchain.new_transaction(sender, recipient, amount)

        # Notify the target chain
        response = requests.post(f'{target_chain_url}/cross_chain_transaction', json={
            'sender': sender,
            'recipient': recipient,
            'amount': amount,
            'transaction_id': transaction_id
        })

        if response.status_code == 200:
            return response.json()
        else:
            raise Exception("Cross-chain transaction failed.")

    def handle_cross_chain_transaction(self, transaction_data):
        # Process the incoming cross-chain transaction
        sender = transaction_data['sender']
        recipient = transaction_data['recipient']
        amount = transaction_data['amount']
        self.blockchain.new_transaction(sender, recipient, amount)
