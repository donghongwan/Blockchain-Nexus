# src/main.py

from flask import Flask, jsonify, request
from flask_cors import CORS
from .services.user_service import UserService
from .services.transaction_service import TransactionService
from .services.ai_service import AIService
from .services.oracle_service import OracleService

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize services
user_service = UserService()
transaction_service = TransactionService()
ai_service = AIService()
oracle_service = OracleService()

@app.route('/')
def home():
    return jsonify({"message": "Welcome to DotaDot API!"})

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.json
    user = user_service.create_user(data['email'], data['password'])
    return jsonify(user), 201

@app.route('/api/users/<user_id>', methods=['GET'])
def get_user(user_id):
    user = user_service.get_user(user_id)
    return jsonify(user)

@app.route('/api/transactions', methods=['POST'])
def create_transaction():
    data = request.json
    transaction = transaction_service.create_transaction(data['user_id'], data['dapp_id'], data['amount'])
    return jsonify(transaction), 201

@app.route('/api/ai/insights', methods=['POST'])
def get_ai_insights():
    data = request.json
    insights = ai_service.analyze_data(data['input_data'])
    return jsonify(insights)

@app.route('/api/oracle/data', methods=['GET'])
def get_oracle_data():
    data = oracle_service.fetch_data()
    return jsonify(data)

def start_application():
    app.run(debug=True)

if __name__ == '__main__':
    start_application()
