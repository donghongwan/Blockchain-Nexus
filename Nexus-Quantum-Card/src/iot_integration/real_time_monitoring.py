import time
import random
import requests
from flask import Flask, jsonify

app = Flask(__name__)

# Simulated device data for demonstration
device_data = {}

@app.route('/monitor', methods=['GET'])
def monitor():
    """Returns the real-time data of all devices."""
    return jsonify(device_data), 200

def simulate_device_data(device_id):
    """Simulates data collection from a device."""
    while True:
        # Simulate random data
        data = {
            "temperature": random.uniform(20.0, 30.0),
            "humidity": random.uniform(30.0, 70.0)
        }
        device_data[device_id] = data
        time.sleep(5)  # Simulate data collection every 5 seconds

if __name__ == ```python
"__main__":
    # Start simulating data for a device
    device_id = "device_1"
    simulate_device_data(device_id)
    app.run(host='0.0.0.0', port=5001)
