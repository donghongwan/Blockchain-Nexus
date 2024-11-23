import time
import random
import numpy as np
from anomaly_detection import AnomalyDetection

class RealTimeFraudMonitoring:
    def __init__(self):
        self.anomaly_detector = AnomalyDetection(method='isolation_forest')
        self.transaction_data = []
        self.model_fitted = False

    def simulate_transaction(self):
        """
        Simulate a transaction with random features.
        """
        # Simulate transaction features (e.g., amount, location, time)
        amount = random.uniform(1, 1000)
        location = random.choice(['US', 'UK', 'EU', 'ASIA'])
        transaction = [amount, location]
        return transaction

    def preprocess_transaction(self, transaction):
        """
        Preprocess the transaction data for anomaly detection.
        
        :param transaction: The raw transaction data.
        :return: Preprocessed data suitable for the model.
        """
        # Convert categorical data to numerical (e.g., one-hot encoding)
        location_map = {'US': 0, 'UK': 1, 'EU': 2, 'ASIA': 3}
        amount = transaction[0]
        location = location_map[transaction[1]]
        return [amount, location]

    def monitor_transactions(self):
        """
        Monitor transactions in real-time and detect anomalies.
        """
        print("Starting real-time fraud monitoring...")
        while True:
            transaction = self.simulate_transaction()
            preprocessed_transaction = self.preprocess_transaction(transaction)
            self.transaction_data.append(preprocessed_transaction)

            if len(self.transaction_data) > 100:  # Fit model after collecting enough data
                if not self.model_fitted:
                    self.anomaly_detector.fit(np.array(self.transaction_data))
                    self.model_fitted = True

                predictions = self.anomaly_detector.predict(np.array(self.transaction_data))
                if predictions[-1] == -1:  # Check if the latest transaction is an anomaly
                    print(f"Anomaly detected in transaction: {transaction}")

            time.sleep(1)  # Simulate a delay between transactions

if __name__ == "__main__":
    fraud_monitor = RealTimeFraudMonitoring()
    fraud_monitor.monitor_transactions()
