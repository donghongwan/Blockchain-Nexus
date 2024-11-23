import requests
from config import Config

class SumitomoMitsuiAPI:
    def __init__(self):
        self.headers = {
            "Authorization": f"Bearer {Config.SUMITOMO_MITSUI_API_KEY}",
            "Content-Type": "application/json"
        }

    def get_account_balance(self, account_id):
        url = f"{Config.SUMITOMO_MITSUI_BASE_URL}/accounts/{account_id}/balance"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Error retrieving balance: {response.status_code} - {response.text}")

    def get_transaction_history(self, account_id):
        url = f"{Config.SUMITOMO_MITSUI_BASE_URL}/accounts/{account_id}/transactions"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Error retrieving transactions: {response.status_code} - {response.text}")

# Example usage
if __name__ == "__main__":
    sumitomo_mitsui_api = SumitomoMitsuiAPI()
    try:
        account_id = "1122334455"  # Replace with a valid account ID
        balance = sumitomo_mitsui_api.get_account_balance(account_id)
        print("Account Balance:", balance)

        transactions = sumitomo_mitsui_api.get_transaction_history(account_id)
        print("Transaction History:", transactions)

    except Exception as e:
        print("An error occurred:", e)
