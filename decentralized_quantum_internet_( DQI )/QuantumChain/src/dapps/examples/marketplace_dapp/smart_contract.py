from web3 import Web3

class MarketplaceSmartContract:
    def __init__(self, web3, contract_address):
        self.web3 = web3
        self.contract_address = contract_address
        self.abi = self.load_abi()  # Load ABI from a file or define it here
        self.contract = self.web3.eth.contract(address=self.contract_address, abi=self.abi)

    def load_abi(self):
        # Load the ABI from a JSON file or define it here
        return []

    def list_items(self):
        return self.contract.functions.listItems().call()

    def buy_item(self, item_id):
        account = self.web3.eth.accounts[0]
        tx = self.contract.functions.buyItem(item_id).buildTransaction({
            'from': account,
            'nonce': self.web3.eth.getTransactionCount(account),
            'gas': 2000000,
            'gasPrice': self.web3.toWei('50', 'gwei')
        })
        signed_tx = self.web3.eth.account.signTransaction(tx, private_key='YOUR_PRIVATE_KEY')
        return self.web3.eth.sendRawTransaction(signed_tx.rawTransaction)
