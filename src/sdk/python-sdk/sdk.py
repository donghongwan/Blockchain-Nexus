import requests
from wallet import Wallet, KYC, TransactionHistory

class PythonSDK:
    def __init__(self, kyc_api_url):
        self.wallet = Wallet()
        self.kyc = KYC(kyc_api_url)
        self.transaction_history = TransactionHistory()

    def create_wallet(self):
        return self.wallet.create_wallet()

    def import_wallet(self, private_key):
        return self.wallet.import_wallet(private_key)

    def submit_kyc(self, user_data):
        return self.kyc.submit_kyc(user_data)

    def get_transaction_history(self):
        return self.transaction_history.get_history()

    def add_transaction(self, transaction):
        self.transaction_history.add_transaction(transaction)
