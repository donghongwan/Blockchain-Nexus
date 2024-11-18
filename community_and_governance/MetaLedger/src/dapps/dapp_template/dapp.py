# dapp.py

from flask import Flask, request, jsonify
from smart_contract import SmartContract

app = Flask(__name__)
contract = SmartContract()

@app.route('/api/execute', methods=['POST'])
def execute_contract():
    data = request.json
    result = contract.execute(data['method'], data['params'])
    return jsonify(result)

@app.route('/api/state', methods=['GET'])
def get_state():
    state = contract.get_state()
    return jsonify(state)

if __name__ == '__main__':
    app.run(debug=True)
