import pandas as pd
import numpy as np
from machine_learning.predictive_analysis import PredictiveAnalysis
from machine_learning.reinforcement_learning import ReinforcementLearningAgent
from machine_learning.model_evaluation import ModelEvaluation

def main():
    # Example for Predictive Analysis
    print("=== Predictive Analysis ===")
    # Create a sample dataset
    data = pd.DataFrame({
        'feature1': [0, 1, 0, 1, 0],
        'feature2': [1, 0, 1, 0, 1],
        'label': [0, 1, 0, 1, 0]
    })

    predictive_analysis = PredictiveAnalysis()
    X, y = predictive_analysis.preprocess_data(data)
    predictive_analysis.train_model(X, y)

    # Example for Reinforcement Learning
    print("\n=== Reinforcement Learning ===")
    actions = [0, 1, 2]  # Example actions
    agent = ReinforcementLearningAgent(actions)

    # Simulated environment interaction
    for episode in range(10):
        state = 0  # Initial state
        action = agent.choose_action(state)
        reward = np.random.rand()  # Simulated reward
        next_state = state + 1 if action == 1 else state  # Example state transition
        agent.update_q_value(state, action, reward, next_state)

    print("Q-table after training:")
    print(agent.q_table)

    # Example for Model Evaluation
    print("\n=== Model Evaluation ===")
    y_true = [0, 1, 1, 0, 1]
    y_pred = [0, 1, 0, 1, 1]  # Example predictions
    evaluator = ModelEvaluation()
    evaluator.evaluate(y_true, y_pred)

if __name__ == "__main__":
    main()
