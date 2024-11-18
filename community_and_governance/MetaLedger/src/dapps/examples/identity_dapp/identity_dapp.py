# identity_dapp.py

from flask import Flask, request, jsonify
from decentralized_identity import DecentralizedIdentity

app = Flask(__name__)
identity_manager = DecentralizedIdentity()

@app.route('/api/create_identity', methods=['POST'])
def create_identity():
    user_id = request.json['user_id']
    identity = identity_manager.create_identity(user_id)
    return jsonify(identity)

@app.route('/api/get_identity/<user_id>', methods=['GET'])
def get_identity(user_id):
    identity = identity_manager.get_identity(user_id)
    return jsonify(identity)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
