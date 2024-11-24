import pandas as pd

class AutomatedReporting:
    def __init__(self, data):
        self.data = data

    def generate_report(self):
        report = self.data.describe()
        report.to_csv('automated_report.csv')
        print("Report generated: automated_report.csv")

# Example usage
if __name__ == "__main__":
    data = pd.read_csv('data.csv')  # Load your data
    reporting = AutomatedReporting(data)
    reporting.generate_report()
