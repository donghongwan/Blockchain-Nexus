from flask import Flask, request, jsonify
from blockchain.blockchain import Blockchain
from blockchain.transaction import Transaction

app = Flask(__name__)
blockchain = Blockchain()

@app.route('/api/example_dapp/transaction', methods=['POST'])
def create_transaction():
    data = request.json
    transaction = Transaction(data['sender'], data['recipient'], data['amount'])
    blockchain.add_transaction(transaction)
    return jsonify({'status': 'Transaction added', 'transaction_id': transaction.transaction_id})

@app.route('/api/example_dapp/blockchain', methods=['GET'])
def get_blockchain():
    return jsonify(blockchain.to_json())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
