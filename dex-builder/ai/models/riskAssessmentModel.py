# ai/models/riskAssessmentModel.py
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

class RiskAssessmentModel:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)

    def train(self, data):
        X = data.drop('risk_label', axis=1)
        y = data['risk_label']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)
        predictions = self.model.predict(X_test)
        print(classification_report(y_test, predictions))

    def assess_risk(self, features):
        return self.model.predict([features])

    def save_model(self, filename='risk_assessment_model.pkl'):
        joblib.dump(self.model, filename)

    def load_model(self, filename='risk_assessment_model.pkl'):
        self.model = joblib.load(filename)
