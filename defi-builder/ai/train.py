# ai/train.py
import pandas as pd
from models.pricePredictionModel import PricePredictionModel
from models.riskAssessmentModel import RiskAssessmentModel
from models.userBehaviorModel import UserBehaviorModel

# Load data
historical_data = pd.read_csv('data/historicalData.csv')
user data = pd.read_json('data/userData.json')

# Train price prediction model
price_model = PricePredictionModel()
price_model.train(historical_data)
price_model.save_model('price_model.pkl')

# Train risk assessment model
risk_model = RiskAssessmentModel()
risk_model.train(user_data)
risk_model.save_model('risk_model.pkl')

# Train user behavior model
behavior_model = UserBehaviorModel()
behavior_model.train(user_data)
behavior_model.save_model('behavior_model.pkl')
