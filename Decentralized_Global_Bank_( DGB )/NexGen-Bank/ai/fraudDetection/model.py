# ai/fraudDetection/model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import IsolationForest
from sklearn.metrics import classification_report, accuracy_score
import joblib

class FraudDetectionModel:
    def __init__(self):
        self.model = IsolationForest(contamination=0.1, random_state=42)

    def train(self, X):
        self.model.fit(X)

    def predict(self, X):
        return self.model.predict(X)

    def save_model(self, filename):
        joblib.dump(self.model, filename)

    def load_model(self, filename):
        self.model = joblib.load(filename)

def load_data(filepath):
    data = pd.read_csv(filepath)
    return data.drop('is_fraud', axis=1)  # Features
