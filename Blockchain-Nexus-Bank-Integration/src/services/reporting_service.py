import logging
import pandas as pd

class ReportingService:
    def __init__(self):
        self.logger = self.setup_logger()

    def setup_logger(self):
        logger = logging.getLogger("ReportingService")
        logger.setLevel(logging.INFO)
        handler = logging.FileHandler("reporting_service.log")
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        return logger

    def generate_report(self, user_id, transactions):
        self.logger.info(f"Generating report for user: {user_id}")
        df = pd.DataFrame(transactions)
        report_file = f"{user_id}_report.csv"
        df.to_csv(report_file, index=False)
        self.logger.info(f"Report generated: {report_file}")
        return report_file

# Example usage
if __name__ == "__main__":
    reporting_service = ReportingService()
    transactions = [
        {"id": "txn001", "amount": 100, "date": "2023-01-01"},
        {"id": "txn002", "amount": 200, "date": "2023-01-02"},
    ]
    report_file = reporting_service.generate_report("user123", transactions)
    print(f"Report saved to {report_file}")
