import numpy as np
from model import NeuralNetworkModel

class Predictor:
    def __init__(self, model):
        self.model = model

    def predict(self, input_data):
        input_data = np.array(input_data).reshape(1, -1)  # Reshape for a single sample
        predictions = self.model.model.predict(input_data)
        return np.argmax(predictions, axis=1)  # Return the class with the highest probability

    def batch_predict(self, input_data):
        input_data = np.array(input_data)
        predictions = self.model.model.predict(input_data)
        return np.argmax(predictions, axis=1)  # Return the class with the highest probability
