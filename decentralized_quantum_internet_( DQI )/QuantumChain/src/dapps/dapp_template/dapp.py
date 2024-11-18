from web3 import Web3
from .smart_contract import SmartContract

class DApp:
    def __init__(self, contract_address, provider_url):
        self.web3 = Web3(Web3.HTTPProvider(provider_url))
        self.contract = SmartContract(self.web3, contract_address)

    def get_data(self):
        return self.contract.get_data()

    def send_transaction(self, function_name, *args):
        return self.contract.send_transaction(function_name, *args)
