# ai/models/pricePredictionModel.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import joblib

class PricePredictionModel:
    def __init__(self):
        self.model = LinearRegression()

    def train(self, data):
        X = data[['feature1', 'feature2']]  # Replace with actual feature names
        y = data['price']  # Replace with actual target variable name
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        self.model.fit(X_train, y_train)
        predictions = self.model.predict(X_test)
        mse = mean_squared_error(y_test, predictions)
        print(f'Mean Squared Error: {mse}')

    def save_model(self, filename):
        joblib.dump(self.model, filename)

    def load_model(self, filename):
        self.model = joblib.load(filename)

    def predict(self, features):
        return self.model.predict([features])
