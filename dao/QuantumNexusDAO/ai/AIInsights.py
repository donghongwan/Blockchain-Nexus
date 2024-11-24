import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

class AIInsights:
    def __init__(self, data):
        self.data = data

    def visualize_data(self):
        plt.figure(figsize=(10, 6))
        sns.lineplot(data=self.data, x='date', y='value')
        plt.title('Data Visualization')
        plt.xlabel('Date')
        plt.ylabel('Value')
        plt.show()

    def generate_report(self):
        report = self.data.describe()
        print("Data Report:")
        print(report)

# Example usage
if __name__ == "__main__":
    data = pd.read_csv('data.csv')  # Load your data
    insights = AIInsights(data)
    insights.visualize_data()
    insights.generate_report()
