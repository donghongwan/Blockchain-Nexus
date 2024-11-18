class DApp:
    def __init__(self, name):
        self.name = name
        self.contract = None

    def deploy_contract(self, contract):
        self.contract = contract
        # Logic to deploy the smart contract to the blockchain

    def interact_with_contract(self, method, *args):
        if self.contract:
            return getattr(self.contract, method)(*args)
        raise Exception("Contract not deployed.")
