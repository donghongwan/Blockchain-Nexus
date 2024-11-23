# dapps/travel_dapp.py
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/book_trip', methods=['POST'])
def book_trip():
    data = request.json
    # Logic to book a trip
    return jsonify({"status": "Trip booked", "trip_id": trip_id})

@app.route('/cancel_trip', methods=['POST'])
def cancel_trip():
    data = request.json
    # Logic to cancel a trip
    return jsonify({"status": "Trip canceled", "trip_id": data['trip_id']})

if __name__ == '__main__':
    app.run(debug=True)
