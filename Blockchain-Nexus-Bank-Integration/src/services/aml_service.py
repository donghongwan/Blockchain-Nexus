import logging
import requests

class AMLService:
    def __init__(self):
        self.logger = self.setup_logger()
        self.aml_api_url = "https://api.aml-provider.com/check"  # Example AML provider API

    def setup_logger(self):
        logger = logging.getLogger("AMLService")
        logger.setLevel(logging.INFO)
        handler = logging.FileHandler("aml_service.log")
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        return logger

    def monitor_transaction(self, transaction):
        self.logger.info(f"Monitoring transaction: {transaction['id']}")
        response = requests.post(self.aml_api_url, json=transaction)

        if response.status_code == 200:
            self.logger.info(f"Transaction {transaction['id']} is compliant.")
            return response.json()
        else:
            self.logger.warning(f"Suspicious activity detected in transaction {transaction['id']} - {response.text}")
            raise Exception("Suspicious transaction detected.")

# Example usage
if __name__ == "__main__":
    aml_service = AMLService()
    transaction = {
        "id": "txn789",
        "amount": 1000,
        "currency": "USD",
        "sender": "user123",
        "recipient": "user456"
    }
    try:
        aml_service.monitor_transaction(transaction)
    except Exception as e:
        print(e)
