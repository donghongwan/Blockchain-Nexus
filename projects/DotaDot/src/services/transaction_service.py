# services/transaction_service.py
from flask import Flask, request, jsonify
from web3 import Web3

app = Flask(__name__)
w3 = Web3(Web3.HTTPProvider('https://your.ethereum.node'))

@app.route('/send_transaction', methods=['POST'])
def send_transaction():
    data = request.json
    tx_hash = w3.eth.sendTransaction({
        'to': data['to'],
        'value': w3.toWei(data['amount'], 'ether'),
        'from': data['from']
    })
    return jsonify({"status": "Transaction sent", "tx_hash": tx_hash.hex()}), 200

@app.route('/get_transaction_status/<tx_hash>', methods=['GET'])
def get_transaction_status(tx_hash):
    receipt = w3.eth.getTransactionReceipt(tx_hash)
    if receipt:
        return jsonify({"status": "Transaction found", "receipt": dict(receipt)}), 200
    return jsonify({"status": "Transaction not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
