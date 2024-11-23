# services/ai_service.py
from flask import Flask, request, jsonify
import random

app = Flask(__name__)

@app.route('/get_recommendations', methods=['POST'])
def get_recommendations():
    data = request.json
    # Simulated AI recommendations
    recommendations = random.sample(['Option A', 'Option B', 'Option C'], 2)
    return jsonify({"status": "Recommendations generated", "recommendations": recommendations}), 200

if __name__ == '__main__':
    app.run(debug=True)
