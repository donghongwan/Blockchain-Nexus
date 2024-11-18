class EnergyMarket:
    def __init__(self):
        self.energy_offers = []

    def list_offer(self, seller, amount, price):
        offer = {
            'seller': seller,
            'amount': amount,
            'price': price
        }
        self.energy_offers.append(offer)

    def buy_energy(self, buyer, offer_index):
        offer = self.energy_offers[offer_index]
        # Implement payment logic and transfer of energy
        return f"{buyer} bought {offer['amount']} energy from {offer['seller']} for {offer['price']}."
