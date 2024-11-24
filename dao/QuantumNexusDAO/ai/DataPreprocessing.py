import pandas as pd
from sklearn.preprocessing import StandardScaler

class DataPreprocessing:
    def __init__(self, data):
        self.data = data

    def normalize_data(self):
        scaler = StandardScaler()
        scaled_data = scaler.fit_transform(self.data)
        return pd.DataFrame(scaled_data, columns=self.data.columns)

    def feature_engineering(self):
        # Example feature engineering
        self.data['new_feature'] = self.data['existing_feature'] ** 2

# Example usage
if __name__ == "__main__":
    data = pd.read_csv('data.csv')  # Load your data
    preprocessing = DataPreprocessing(data)
    normalized_data = preprocessing.normalize_data()
    print(normalized_data.head())
