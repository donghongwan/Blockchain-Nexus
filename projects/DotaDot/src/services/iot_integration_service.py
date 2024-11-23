# services/iot_integration_service.py
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/register_device', methods=['POST'])
def register_device():
    data = request.json
    # Logic to register an IoT device
    return jsonify({"status": "Device registered", "device_id": data['device_id']}), 201

@app.route('/send_device_data', methods=['POST'])
def send_device_data():
    data = request.json
    # Logic to process incoming data from IoT devices
    return jsonify({"status": "Device data received", "device_id": data['device_id']}), 200

if __name__ == '__main__':
    app.run(debug=True)
