# services/user_service.py
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

users_db = {}  # Simulated database

@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    hashed_password = generate_password_hash(data['password'], method='sha256')
    users_db[data['username']] = {'password': hashed_password}
    return jsonify({"status": "User  registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login_user():
    data = request.json
    user = users_db.get(data['username'])
    if user and check_password_hash(user['password'], data['password']):
        return jsonify({"status": "Login successful"}), 200
    return jsonify({"status": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)
