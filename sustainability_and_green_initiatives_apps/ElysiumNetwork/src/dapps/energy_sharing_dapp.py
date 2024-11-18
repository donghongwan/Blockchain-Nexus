from flask import Flask, request, jsonify
from energy_market import EnergyMarket

app = Flask(__name__)
energy_market = EnergyMarket()

@app.route('/list_offer', methods=['POST'])
def list_offer():
    data = request.json
    seller = data['seller']
    amount = data['amount']
    price = data['price']
    energy_market.list_offer(seller, amount, price)
    return jsonify({"message": "Energy offer listed successfully."}), 201

@app.route('/buy_energy', methods=['POST'])
def buy_energy():
    data = request.json
    buyer = data['buyer']
    offer_index = data['offer_index']
    message = energy_market.buy_energy(buyer, offer_index)
    return jsonify({"message": message}), 200

@app.route('/offers', methods=['GET'])
def get_offers():
    offers = energy_market.energy_offers
    return jsonify({"offers": offers}), 200

if __name__ == '__main__':
    app.run(debug=True)
