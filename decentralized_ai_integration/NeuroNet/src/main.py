import logging
from flask import Flask
from blockchain.blockchain import Blockchain
from blockchain.transaction import Transaction
from ai.model import load_model
from security.authentication import authenticate_user

app = Flask(__name__)

# Initialize the blockchain
blockchain = Blockchain()

# Load AI model for predictions
model = load_model()

@app.route('/api/blockchain', methods=['GET'])
def get_blockchain():
    return blockchain.to_json()

@app.route('/api/blockchain/transaction', methods=['POST'])
def create_transaction():
    # Assume request data is validated and parsed
    transaction_data = request.json
    transaction = Transaction(transaction_data['sender'], transaction_data['recipient'], transaction_data['amount'])
    blockchain.add_transaction(transaction)
    return {'status': 'Transaction added', 'transaction_id': transaction.transaction_id}

@app.route('/api/security/authenticate', methods=['POST'])
def authenticate():
    credentials = request.json
    token = authenticate_user(credentials['username'], credentials['password'])
    return {'token': token}

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    app.run(host='0.0.0.0', port=5000)
