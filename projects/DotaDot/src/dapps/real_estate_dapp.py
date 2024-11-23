# dapps/real_estate_dapp.py
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/list_property', methods=['POST'])
def list_property():
    data = request.json
    # Logic to list a property for sale
    return jsonify({"status": "Property listed", "property_id": property_id})

@app.route('/buy_property', methods=['POST'])
def buy_property():
    data = request.json
    # Logic to purchase a property
    return jsonify({"status": "Property purchased", "property_id": data['property_id']})

if __name__ == '__main__':
    app.run(debug=True)
