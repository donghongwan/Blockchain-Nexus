# ai/fraudDetection/train.py
import pandas as pd
from model import FraudDetectionModel, load_data

def main():
    # Load dataset
    X = load_data('data/fraud_detection_data.csv')

    # Initialize and train the model
    model = FraudDetectionModel()
    model.train(X)

    # Save the trained model
    model.save_model('fraud_detection_model.pkl')

if __name__ == "__main__":
    main()
