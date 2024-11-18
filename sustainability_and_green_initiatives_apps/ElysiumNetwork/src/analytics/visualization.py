import matplotlib.pyplot as plt
import seaborn as sns

class Visualization:
    def __init__(self, data):
        self.data = data

    def plot_time_series(self, x_column, y_column):
        plt.figure(figsize=(12, 6))
        plt.plot(self.data[x_column], self.data[y_column], marker='o')
        plt.title(f'Time Series of {y_column}')
        plt.xlabel(x_column)
        plt.ylabel(y_column)
        plt.grid()
        plt.show()

    def plot_correlation_heatmap(self):
        plt.figure(figsize=(10, 8))
        correlation = self.data.corr()
        sns.heatmap(correlation, annot=True, fmt=".2f", cmap='coolwarm')
        plt.title('Correlation Heatmap')
        plt.show()

    def plot_distribution(self, column):
        plt.figure(figsize=(10, 6))
        sns.histplot(self.data[column], bins=30, kde=True)
        plt.title(f'Distribution of {column}')
        plt.xlabel(column)
        plt.ylabel('Frequency')
        plt.show()
