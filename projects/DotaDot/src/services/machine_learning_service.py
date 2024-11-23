# services/machine_learning_service.py
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load('path/to/your/model.pkl')  # Load your pre-trained model

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    prediction = model.predict([data['features']])
    return jsonify({"status": "Prediction made", "prediction": prediction.tolist()}), 200

if __name__ == '__main__':
    app.run(debug=True)
