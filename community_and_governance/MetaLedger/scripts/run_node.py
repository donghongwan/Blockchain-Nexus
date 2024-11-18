# run_node.py

import os
import sys
from utils.logger import Logger
from blockchain import Blockchain
from flask import Flask, jsonify

log = Logger()
app = Flask(__name__)
blockchain = Blockchain()

@app.route('/chain', methods=['GET'])
def get_chain():
    return jsonify(blockchain.chain)

@app.route('/mine', methods=['POST'])
def mine_block():
    blockchain.add_block(data="New Block")
    log.info("New block mined.")
    return jsonify(blockchain.chain[-1]), 201

if __name__ == "__main__":
    log.info("Starting blockchain node...")
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
