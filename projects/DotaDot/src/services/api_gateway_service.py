# services/api_gateway_service.py
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/api/<service_name>', methods=['POST'])
def api_gateway(service_name):
    service_url = f"http://localhost:5000/{service_name}"  # Assuming services are running locally
    response = requests.post(service_url, json=request.json)
    return jsonify(response.json()), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
