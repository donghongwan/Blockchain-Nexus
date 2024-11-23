import requests
from config import Config

class FirstHorizonAPI:
    def __init__(self):
        self.headers = {
            "Authorization": f"Bearer {Config.FIRST_HORIZON_API_KEY}",
            "Content-Type": "application/json"
        }

    def get_account_balance(self, account_id):
        url = f"{Config.FIRST_HORIZON_BASE_URL}/accounts/{account_id}/balance"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Error retrieving balance: {response.status_code} - {response.text}")

    def get_transaction_history(self, account_id):
        url = f"{Config.FIRST_HORIZON_BASE_URL}/accounts/{account_id}/transactions"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Error retrieving transactions: {response.status_code} - {response.text}")

# Example usage
if __name__ == "__main__":
    first_horizon_api = FirstHorizonAPI()
    try:
        account_id = "2233445566"  # Replace with a valid account ID
        balance = first_horizon_api.get_account_balance(account_id)
        print("Account Balance:", balance)

        transactions = first_horizon_api.get_transaction_history(account_id)
        print("Transaction History:", transactions)

    except Exception as e:
        print("An error occurred:", e)
