import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.metrics import roc_auc_score

class AnomalyDetection:
    def __init__(self, method='isolation_forest'):
        self.method = method
        self.model = None

    def fit(self, data):
        """
        Fit the anomaly detection model to the data.
        
        :param data: The input data for training.
        """
        if self.method == 'isolation_forest':
            self.model = IsolationForest(contamination=0.05, random_state=42)
            self.model.fit(data)

    def predict(self, data):
        """
        Predict anomalies in the data.
        
        :param data: The input data for prediction.
        :return: An array of predictions (1 for normal, -1 for anomaly).
        """
        if self.model is None:
            raise Exception("Model has not been fitted yet.")
        return self.model.predict(data)

    def evaluate(self, true_labels, predictions):
        """
        Evaluate the model using ROC AUC score.
        
        :param true_labels: The true labels of the data.
        :param predictions: The predicted labels from the model.
        :return: The ROC AUC score.
        """
        return roc_auc_score(true_labels, predictions)

if __name__ == "__main__":
    # Example usage
    # Generate synthetic data for demonstration
    np.random.seed(42)
    normal_data = np.random.normal(loc=0, scale=1, size=(100, 2))
    anomaly_data = np.random.normal(loc=5, scale=1, size=(10, 2))
    data = np.vstack((normal_data, anomaly_data))
    labels = np.array([1] * 100 + [-1] * 10)  # 1 for normal, -1 for anomaly

    # Anomaly detection
    anomaly_detector = AnomalyDetection(method='isolation_forest')
    anomaly_detector.fit(data)
    predictions = anomaly_detector.predict(data)

    # Evaluate the model
    auc_score = anomaly_detector.evaluate(labels, predictions)
    print(f"ROC AUC Score: {auc_score:.2f}")
