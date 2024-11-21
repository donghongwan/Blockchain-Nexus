# ai/models/pricePredictionModel.py
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import joblib

class PricePredictionModel:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)

    def train(self, data):
        X = data.drop('price', axis=1)
        y = data['price']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)
        predictions = self.model.predict(X_test)
        mse = mean_squared_error(y_test, predictions)
        print(f'Model trained with MSE: {mse}')

    def predict(self, features):
        return self.model.predict([features])

    def save_model(self, filename='price_prediction_model.pkl'):
        joblib.dump(self.model, filename)

    def load_model(self, filename='price_prediction_model.pkl'):
        self.model = joblib.load(filename)
