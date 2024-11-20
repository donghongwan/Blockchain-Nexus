import numpy as np
from model import NeuralNetworkModel
from sklearn.model_selection import train_test_split

class ModelTrainer:
    def __init__(self, model, epochs=50, batch_size=32):
        self.model = model
        self.epochs = epochs
        self.batch_size = batch_size

    def train(self, X, y):
        X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)
        history = self.model.fit(X_train, y_train, epochs=self.epochs, batch_size=self.batch_size, validation_data=(X_val, y_val))
        return history

    def evaluate(self, X_test, y_test):
        return self.model.evaluate(X_test, y_test)

    def save_model(self, filepath):
        self.model.save_model(filepath)
