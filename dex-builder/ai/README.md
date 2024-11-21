# AI Module for Advanced DEX

This AI module is designed to enhance the functionality of the Advanced DEX by providing models for price prediction, risk assessment, and user behavior analysis.

## Models

### 1. Price Prediction Model
- **File**: `models/pricePredictionModel.py`
- **Description**: Uses a Random Forest Regressor to predict the price of tokens based on historical data.
- **Methods**:
  - `train(data)`: Trains the model using the provided dataset.
  - `predict(features)`: Predicts the price based on input features.
  - `save_model(filename)`: Saves the trained model to a file.
  - `load_model(filename)`: Loads a trained model from a file.

### 2. Risk Assessment Model
- **File**: `models/riskAssessmentModel.py`
- **Description**: Uses a Random Forest Classifier to assess the risk level of users based on their trading behavior and other features.
- **Methods**:
  - `train(data)`: Trains the model using the provided dataset.
  - `assess_risk(features)`: Predicts the risk level based on input features.
  - `save_model(filename)`: Saves the trained model to a file.
  - `load_model(filename)`: Loads a trained model from a file.

### 3. User Behavior Model
- **File**: `models/userBehaviorModel.py`
- **Description**: Uses K-Means clustering to analyze user behavior patterns.
- **Methods**:
  - `train(data)`: Trains the model using the provided dataset.
  - `predict_behavior(features)`: Predicts the user behavior cluster based on input features.
  - `save_model(filename)`: Saves the trained model to a file.
  - `load_model(filename)`: Loads a trained model from a file.

## Data
The `data/` directory is intended for storing datasets used for training the models. Sample datasets can be added in CSV format.

## Installation
To install the required packages, run the following command:

```bash
1 pip install -r requirements.txt
```
