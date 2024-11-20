import numpy as np
from sklearn.ensemble import IsolationForest

class AnomalyDetector:
    def __init__(self, contamination=0.1):
        self.model = IsolationForest(contamination=contamination)

    def fit(self, X):
        self.model.fit(X)

    def predict(self, X):
        return self.model.predict(X)  # Returns -1 for anomalies and 1 for normal points

    def score_samples(self, X):
        return self.model.score_samples(X)  # Returns the anomaly score for each sample
