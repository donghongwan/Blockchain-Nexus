# ai/riskAssessment/train.py
import pandas as pd
from model import RiskAssessmentModel, load_data

def main():
    # Load dataset
    X, y = load_data('data/risk_assessment_data.csv')

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Initialize and train the model
    model = RiskAssessmentModel()
    model.train(X_train, y_train)

    # Evaluate the model
    predictions = model.predict(X_test)
    print(classification_report(y_test, predictions))
    print("Accuracy:", accuracy_score(y_test, predictions))

    # Save the trained model
    model.save_model('risk_assessment_model.pkl')

if __name__ == "__main__":
    main()
