from web3 import Web3
from .smart_contract import MarketplaceSmartContract

class MarketplaceDApp:
    def __init__(self, contract_address, provider_url):
        self.web3 = Web3(Web3.HTTPProvider(provider_url))
        self.contract = MarketplaceSmartContract(self.web3, contract_address)

    def list_items(self):
        return self.contract.list_items()

    def buy_item(self, item_id):
        return self.contract.buy_item(item_id)
