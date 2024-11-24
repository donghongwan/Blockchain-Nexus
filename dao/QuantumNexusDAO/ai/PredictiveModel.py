import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error

class PredictiveModel:
    def __init__(self, data):
        self.data = data
        self.model = RandomForestRegressor()

    def preprocess_data(self):
        # Example preprocessing
        self.data.fillna(0, inplace=True)
        X = self.data.drop('target', axis=1)
        y = self.data['target']
        return train_test_split(X, y, test_size=0.2, random_state=42)

    def train_model(self):
        X_train, X_test, y_train, y_test = self.preprocess_data()
        self.model.fit(X_train, y_train)
        predictions = self.model.predict(X_test)
        mse = mean_squared_error(y_test, predictions)
        print(f'Mean Squared Error: {mse}')

# Example usage
if __name__ == "__main__":
    data = pd.read_csv('data.csv')  # Load your data
    model = PredictiveModel(data)
    model.train_model()
