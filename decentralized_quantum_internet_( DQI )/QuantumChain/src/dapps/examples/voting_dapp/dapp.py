from web3 import Web3
from .smart_contract import VotingSmartContract

class VotingDApp:
    def __init__(self, contract_address, provider_url):
        self.web3 = Web3(Web3.HTTPProvider(provider_url ))
        self.contract = VotingSmartContract(self.web3, contract_address)

    def get_candidates(self):
        return self.contract.get_candidates()

    def vote(self, candidate_id):
        return self.contract.vote(candidate_id)
