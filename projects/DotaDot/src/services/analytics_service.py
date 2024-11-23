# services/analytics_service.py
from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/generate_report', methods=['POST'])
def generate_report():
    data = request.json
    # Simulated data analysis
    df = pd.DataFrame(data['transactions'])
    report = df.describe().to_dict()
    return jsonify({"status": "Report generated", "report": report}), 200

if __name__ == '__main__':
    app.run(debug=True)
