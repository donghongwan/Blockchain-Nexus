# src/banks/bank_of_america_api.py

import requests

class BankOfAmericaAPI:
    def __init__(self, api_key, base_url="https://api.bankofamerica.com/v1"):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

    def get_account_balance(self, account_id):
        url = f"{self.base_url}/accounts/{account_id}/balance"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Error fetching balance: {response.status_code} - {response.text}")

    def get_transaction_history(self, account_id):
        url = f"{self.base_url}/accounts/{account_id}/transactions"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Error fetching transaction history: {response.status_code} - {response.text}")

# Example usage
if __name__ == "__main__":
    boa_api = BankOfAmericaAPI(api_key="YOUR_API_KEY")
    account_id = "123456789"

    try:
        balance = boa_api.get_account_balance(account_id)
        print("Account Balance:", balance)

        transactions = boa_api.get_transaction_history(account_id)
        print("Transaction History:", transactions)
    except Exception as e:
        print("An error occurred:", str(e))
