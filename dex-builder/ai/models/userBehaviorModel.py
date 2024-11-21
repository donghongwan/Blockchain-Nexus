# ai/models/userBehaviorModel.py
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
import joblib

class UserBehaviorModel:
    def __init__(self, n_clusters=5):
        self.model = KMeans(n_clusters=n_clusters, random_state=42)

    def train(self, data):
        self.model.fit(data)

    def predict_behavior(self, features):
        return self.model.predict([features])

    def save_model(self, filename='user_behavior_model.pkl'):
        joblib.dump(self.model, filename)

    def load_model(self, filename='user_behavior_model.pkl'):
        self.model = joblib.load(filename)
