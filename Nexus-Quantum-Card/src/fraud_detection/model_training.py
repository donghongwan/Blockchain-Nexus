from data_preprocessing import DataPreprocessing
from fraud_detection_model import FraudDetectionModel

def main():
    # Load and preprocess data
    data_preprocessor = DataPreprocessing('path/to/your/fraud_data.csv')
    data_preprocessor.load_data()
    X_train, X_test, y_train, y_test = data_preprocessor.preprocess_data()

    # Initialize and train the fraud detection model
    fraud_model = FraudDetectionModel()
    fraud_model.train(X_train, y_train)

    # Evaluate the model
    fraud_model.evaluate(X_test, y_test)

    # Save the trained model
    fraud_model.save_model('fraud_detection_model.pkl')

if __name__ == "__main__":
    main()
