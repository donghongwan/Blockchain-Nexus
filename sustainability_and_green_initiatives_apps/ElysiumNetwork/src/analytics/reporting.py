import json
from datetime import datetime

class Reporting:
    def __init__(self, carbon_data, energy_data):
        self.carbon_data = carbon_data
        self.energy_data = energy_data

    def generate_carbon_report(self):
        total_credits = sum(item['credits'] for item in self.carbon_data)
        report = {
            "total_carbon_credits": total_credits,
            "report_date": datetime.now().isoformat()
        }
        return json.dumps(report, indent=4)

    def generate_energy_report(self):
        total_energy = sum(item['usage'] for item in self.energy_data)
        report = {
            "total_energy_usage": total_energy,
            "report_date": datetime.now().isoformat()
        }
        return json.dumps(report, indent=4)

    def save_report(self, report, filename):
        with open(filename, 'w') as f:
            f.write(report)
