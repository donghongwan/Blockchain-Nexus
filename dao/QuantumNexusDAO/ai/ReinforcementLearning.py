import numpy as np

class ReinforcementLearning:
    def __init__(self, actions, states):
        self.q_table = np.zeros((states, actions))
        self.learning_rate = 0.1
        self.discount_factor = 0.95

    def update_q_value(self, state, action, reward, next_state):
        best_next_action = np.argmax(self.q_table[next_state])
        td_target = reward + self.discount_factor * self.q_table[next_state][best_next_action]
        td_delta = td_target - self.q_table[state][action]
        self.q_table[state][action] += self.learning_rate * td_delta

# Example usage
if __name__ == "__main__":
    rl = ReinforcementLearning(actions=4, states=10)
    # Simulate an update
    rl.update_q_value(state=0, action=1, reward=10, next_state=2)
    print(rl.q_table)
