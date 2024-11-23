# services/sentiment_analysis_service.py
from flask import Flask, request, jsonify
from textblob import TextBlob

app = Flask(__name__)

@app.route('/analyze_sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.json
    analysis = TextBlob(data['text'])
    sentiment = analysis.sentiment.polarity
    return jsonify({"status": "Sentiment analysis completed", "sentiment": sentiment}), 200

if __name__ == '__main__':
    app.run(debug=True)
