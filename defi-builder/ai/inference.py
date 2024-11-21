# ai/inference.py
import joblib
import numpy as np
from models.pricePredictionModel import PricePredictionModel
from models.riskAssessmentModel import RiskAssessmentModel
from models.userBehaviorModel import UserBehaviorModel

# Load models
price_model = PricePredictionModel()
price_model.load_model('price_model.pkl')

risk_model = RiskAssessmentModel()
risk_model.load_model('risk_model.pkl')

behavior_model = UserBehaviorModel()
behavior_model.load_model('behavior_model.pkl')

# Example features for prediction
price_features = [3.0, 4.0]  # Replace with actual feature values
risk_features = [1.5, 2.5]    # Replace with actual feature values
behavior_features = [1.0, 2.0] # Replace with actual feature values

# Perform predictions
predicted_price = price_model.predict(price_features)
predicted_risk = risk_model.predict(risk_features)
predicted_behavior = behavior_model.predict(behavior_features)

print(f'Predicted Price: {predicted_price}')
print(f'Predicted Risk: {predicted_risk}')
print(f'Predicted User Behavior Cluster: {predicted_behavior}')
