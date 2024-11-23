import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

class PredictiveAnalysis:
    def __init__(self):
        self.model = RandomForestClassifier(random_state=42)

    def load_data(self, file_path):
        """
        Load user behavior data from a CSV file.
        
        :param file_path: Path to the CSV file containing user behavior data.
        :return: DataFrame containing the data.
        """
        return pd.read_csv(file_path)

    def preprocess_data(self, data):
        """
        Preprocess the data for training.
        
        :param data: DataFrame containing the raw data.
        :return: Features and labels for training.
        """
        # Assuming the last column is the label
        X = data.iloc[:, :-1]
        y = data.iloc[:, -1]
        return X, y

    def train_model(self, X, y):
        """
        Train the predictive model.
        
        :param X: Features for training.
        :param y: Labels for training.
        """
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)
        predictions = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, predictions)
        print(f"Model accuracy: {accuracy:.2f}")

    def predict(self, new_data):
        """
        Predict user behavior based on new data.
        
        :param new_data: New data for prediction.
        :return: Predicted labels.
        """
        return self.model.predict(new_data)

if __name__ == "__main__":
    # Example usage of PredictiveAnalysis
    predictive_analysis = PredictiveAnalysis()
    data = predictive_analysis.load_data("user_behavior.csv")  # Replace with your CSV file path
    X, y = predictive_analysis.preprocess_data(data)
    predictive_analysis.train_model(X, y)

    # Example prediction with new data
    new_data = np.array([[25, 1, 0]])  # Example new user data
    prediction = predictive_analysis.predict(new_data)
    print(f"Predicted behavior: {prediction}")
