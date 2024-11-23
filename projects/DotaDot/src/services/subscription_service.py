# services/subscription_service.py
from flask import Flask, request, jsonify

app = Flask(__name__)

subscriptions = {}  # Simulated subscription storage

@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.json
    subscriptions[data['user_id']] = data['plan']
    return jsonify({"status": "Subscription successful", "user_id": data['user_id'], "plan": data['plan']}), 201

@app.route('/get_subscription/<user_id>', methods=['GET'])
def get_subscription(user_id):
    plan = subscriptions.get(user_id)
    if plan:
        return jsonify({"status": "Subscription found", "user_id": user_id, "plan": plan}), 200
    return jsonify({"status": "No subscription found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
