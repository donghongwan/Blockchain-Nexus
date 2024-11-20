import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

class UserBehaviorAnalyzer:
    def __init__(self, n_clusters=3):
        self.n_clusters = n_clusters
        self.model = KMeans(n_clusters=self.n_clusters)
        self.scaler = StandardScaler()

    def fit(self, user_data):
        """Fits the KMeans model to the user behavior data."""
        scaled_data = self.scaler.fit_transform(user_data)
        self.model.fit(scaled_data)

    def predict(self, new_data):
        """Predicts the cluster for new user behavior data."""
        scaled_data = self.scaler.transform(new_data)
        return self.model.predict(scaled_data)

    def analyze(self, user_data):
        """Analyzes user behavior and returns cluster labels."""
        scaled_data = self.scaler.transform(user_data)
        return self.model.predict(scaled_data)

    def get_cluster_centers(self):
        """Returns the cluster centers."""
        return self.model.cluster_centers_
