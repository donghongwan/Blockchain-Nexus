# services/notification_service.py
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/send_notification', methods=['POST'])
def send_notification():
    data = request.json
    # Logic to send notification (e.g., email, SMS)
    return jsonify({"status": "Notification sent", "recipient": data['recipient']}), 200

if __name__ == '__main__':
    app.run(debug=True)
