import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

class DataPreprocessing:
    def __init__(self, filepath):
        self.filepath = filepath
        self.data = None

    def load_data(self):
        """Loads the dataset from a CSV file."""
        self.data = pd.read_csv(self.filepath)

    def preprocess_data(self):
        """Preprocesses the data for training."""
        # Example preprocessing steps
        self.data.dropna(inplace=True)  # Remove missing values
        self.data = pd.get_dummies(self.data)  # One-hot encoding for categorical variables

        # Split features and target variable
        X = self.data.drop('is_fraud', axis=1)  # Assuming 'is_fraud' is the target column
        y = self.data['is_fraud']

        # Split into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Feature scaling
        scaler = StandardScaler()
        X_train = scaler.fit_transform(X_train)
        X_test = scaler.transform(X_test)

        return X_train, X_test, y_train, y_test

# Example usage
if __name__ == "__main__":
    data_preprocessor = DataPreprocessing('path/to/your/fraud_data.csv')
    data_preprocessor.load_data()
    X_train, X_test, y_train, y_test = data_preprocessor.preprocess_data()
