# services/data_storage_service.py
from flask import Flask, request, jsonify

app = Flask(__name__)

data_storage = {}  # Simulated decentralized storage

@app.route('/store_data', methods=['POST'])
def store_data():
    data = request.json
    data_id = len(data_storage) + 1
    data_storage[data_id] = data['content']
    return jsonify({"status": "Data stored", "data_id": data_id}), 201

@app.route('/retrieve_data/<data_id>', methods=['GET'])
def retrieve_data(data_id):
    content = data_storage.get(int(data_id))
    if content:
        return jsonify({"status": "Data retrieved", "data_id": data_id, "content": content}), 200
    return jsonify({"status": "Data not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
