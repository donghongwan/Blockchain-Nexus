# ai/models/userBehaviorModel.py
import pandas as pd
from sklearn.cluster import KMeans
import joblib

class UserBehaviorModel:
    def __init__(self):
        self.model = KMeans(n_clusters=3)  # Adjust number of clusters as needed

    def train(self, data):
        X = data[['feature1', 'feature2']]  # Replace with actual feature names
        self.model.fit(X)

    def save_model(self, filename):
        joblib.dump(self.model, filename)

    def load_model(self, filename):
        self.model = joblib.load(filename)

    def predict(self, features):
        return self.model.predict([features])
