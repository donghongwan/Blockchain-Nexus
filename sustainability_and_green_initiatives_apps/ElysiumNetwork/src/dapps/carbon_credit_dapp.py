from flask import Flask, request, jsonify
from carbon_credit import CarbonCredit

app = Flask(__name__)
carbon_credit_system = CarbonCredit()

@app.route('/mint', methods=['POST'])
def mint_credit():
    data = request.json
    user_id = data['user_id']
    amount = data['amount']
    carbon_credit_system.mint_credit(user_id, amount)
    return jsonify({"message": "Carbon credits minted successfully."}), 201

@app.route('/transfer', methods=['POST'])
def transfer_credit():
    data = request.json
    from_user = data['from_user']
    to_user = data['to_user']
    amount = data['amount']
    success = carbon_credit_system.transfer_credit(from_user, to_user, amount)
    if success:
        return jsonify({"message": "Carbon credits transferred successfully."}), 200
    return jsonify({"message": "Transfer failed. Insufficient credits."}), 400

@app.route('/balance/<user_id>', methods=['GET'])
def get_balance(user_id):
    balance = carbon_credit_system.get_balance(user_id)
    return jsonify({"balance": balance}), 200

if __name__ == '__main__':
    app.run(debug=True)
