import pandas as pd
import numpy as np

class DataAnalysis:
    def __init__(self, data):
        self.data = pd.DataFrame(data)

    def calculate_average(self, column):
        return self.data[column].mean()

    def calculate_trends(self, column):
        return self.data[column].pct_change().dropna()

    def filter_data(self, column, threshold):
        return self.data[self.data[column] > threshold]

    def summarize_data(self):
        return self.data.describe()

    def correlation_matrix(self):
        return self.data.corr()
