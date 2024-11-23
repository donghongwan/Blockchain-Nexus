import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

class FraudDetectionModel:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)

    def train(self, X_train, y_train):
        """Trains the fraud detection model."""
        self.model.fit(X_train, y_train)

    def predict(self, X):
        """Predicts fraudulent activities."""
        return self.model.predict(X)

    def evaluate(self, X_test, y_test):
        """Evaluates the model performance."""
        y_pred = self.predict(X_test)
        print("Confusion Matrix:")
        print(confusion_matrix(y_test, y_pred))
        print("\nClassification Report:")
        print(classification_report(y_test, y_pred))

    def save_model(self, filename):
        """Saves the trained model to a file."""
        joblib.dump(self.model, filename)

    def load_model(self, filename):
        """Loads a trained model from a file."""
        self.model = joblib.load(filename)

# Example usage
if __name__ == "__main__":
    # This part would typically be in model_training.py
    pass
