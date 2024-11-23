import json
from flask import Flask, request

app = Flask(__name__)

# In-memory storage for devices (for demonstration purposes)
devices = {}

class DeviceManagement:
    @app.route('/register_device', methods=['POST'])
    def register_device():
        """Registers a new IoT device."""
        device_info = request.json
        device_id = device_info.get('device_id')
        if device_id in devices:
            return json.dumps({"status": "error", "message": "Device already registered."}), 400
        
        devices[device_id] = {
            "status": "offline",
            "data": {}
        }
        return json.dumps({"status": "success", "message": "Device registered successfully."}), 201

    @app.route('/update_device_status', methods=['POST'])
    def update_device_status():
        """Updates the status of an IoT device."""
        device_info = request.json
        device_id = device_info.get('device_id')
        status = device_info.get('status')

        if device_id not in devices:
            return json.dumps({"status": "error", "message": "Device not found."}), 404
        
        devices[device_id]['status'] = status
        return json.dumps({"status": "success", "message": "Device status updated."}), 200

    @app.route('/get_devices', methods=['GET'])
    def get_devices():
        """Returns the list of registered devices."""
        return json.dumps(devices), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
