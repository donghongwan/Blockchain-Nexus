import unittest
import numpy as np
from machine_learning.predictive_analysis import PredictiveAnalysis
from machine_learning.reinforcement_learning import ReinforcementLearningAgent
from machine_learning.model_evaluation import ModelEvaluation

class TestPredictiveAnalysis(unittest.TestCase):
    def test_preprocess_data(self):
        data = np.array([[1, 0], [0, 1], [1, 1], [0, 0]])
        labels = np.array([1, 0, 1, 0])
        pa = PredictiveAnalysis()
        X, y = pa.preprocess_data(pd.DataFrame(data))
        np.testing.assert_array_equal(X.values, data)
        np.testing.assert_array_equal(y.values, labels)

class TestReinforcementLearningAgent(unittest.TestCase):
    def test_choose_action(self):
        actions = [0, 1, 2]
        agent = ReinforcementLearningAgent(actions)
        action = agent.choose_action(0)
        self.assertIn(action, actions)

    def test_update_q_value(self):
        agent = ReinforcementLearningAgent(actions=[0, 1, 2])
        agent.update_q_value(state=0, action=1, reward=1, next_state=1)
        self.assertNotEqual(agent.q_table[1], 0)

class TestModelEvaluation(unittest.TestCase):
    def test_evaluate(self):
        evaluator = ModelEvaluation()
        y_true = [0, 1, 1, 0]
        y_pred = [0, 1, 0, 1]
        evaluator.evaluate(y_true, y_pred)  # This will print, but we can check the method runs without error

if __name__ == "__main__":
    unittest.main()
