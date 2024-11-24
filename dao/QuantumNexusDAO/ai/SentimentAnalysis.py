import pandas as pd
from textblob import TextBlob

class SentimentAnalysis:
    def __init__(self, data):
        self.data = data

    def analyze_sentiment(self):
        self.data['polarity'] = self.data['text'].apply(lambda x: TextBlob(x).sentiment.polarity)
        self.data['sentiment'] = self.data['polarity'].apply(lambda x: 'positive' if x > 0 else ('negative' if x < 0 else 'neutral'))

# Example usage
if __name__ == "__main__":
    data = pd.DataFrame({'text': ['I love this!', 'This is bad.', 'I feel neutral about this.']})
    sentiment_analysis = SentimentAnalysis(data)
    sentiment_analysis.analyze_sentiment()
    print(data)  # Display the results with sentiment analysis
