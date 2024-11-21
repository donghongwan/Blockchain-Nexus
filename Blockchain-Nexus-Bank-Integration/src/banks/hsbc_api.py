# src/banks/hsbc_api.py

import requests

class HSBCAPI:
    def __init__(self, client_id, client_secret, base_url="https://api.hsbc.com/v1"):
        self.client_id = client_id
        self.client_secret = client_secret
        self.base_url = base_url
        self.token = self.authenticate()

    def authenticate(self):
        url = f"{self.base_url}/auth/token"
        response = requests.post(url, json={
            "client_id": self.client_id,
            "client_secret": self.client_secret
        })

        if response.status_code == 200:
            return response.json().get("access_token")
        else:
            raise Exception(f"Authentication failed: {response.status_code} - {response.text}")

    def get_account_balance(self, account_id):
        url = f"{self.base_url}/accounts/{account_id}/balance"
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Error fetching balance: {response.status_code} - {response.text}")

    def get_transaction_history(self, account_id):
        url = f"{self.base_url}/accounts/{account_id}/transactions"
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Error fetching transaction history: {response.status_code} - {response.text}")

# Example usage
if __name__ == "__main__":
    hsbc_api = HSBCAPI(client_id="YOUR_CLIENT_ID", client_secret="YOUR_CLIENT_SECRET")
    account_id = "987654321"

    try:
        balance = hsbc_api.get_account_balance(account_id)
        print("Account Balance:", balance)

        transactions = hsbc_api.get_transaction_history(account_id)
        print("Transaction History:", transactions)
    except Exception as e:
        print("An error occurred:", str(e))
