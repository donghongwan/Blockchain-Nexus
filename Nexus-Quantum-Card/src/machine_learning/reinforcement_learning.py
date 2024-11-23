import numpy as np

class ReinforcementLearningAgent:
    def __init__(self, actions, learning_rate=0.1, discount_factor=0.9):
        self.actions = actions
        self.learning_rate = learning_rate
        self.discount_factor = discount_factor
        self.q_table = np.zeros(len(actions))

    def choose_action(self, state):
        """
        Choose an action based on the current state using an epsilon-greedy strategy.
        
        :param state: The current state of the environment.
        :return: The chosen action.
        """
        if np.random.rand() < 0.1:  # Epsilon-greedy
            return np.random.choice(self.actions)
        return np.argmax(self.q_table)

    def update_q_value(self, state, action, reward, next_state):
        """
        Update the Q-value based on the action taken and the reward received.
        
        :param state: The current state.
        :param action: The action taken.
        :param reward: The reward received.
        :param next_state: The next state after taking the action.
        """
        best_next_action = np.argmax(self.q_table)
        td_target = reward + self.discount_factor * self.q_table[best_next_action]
        td_delta = td_target - self.q_table[action]
        self.q_table[action] += self.learning_rate * td_delta

if __name__ == "__main__":
    # Example usage of ReinforcementLearningAgent
    actions = [0, 1, 2]  # Example actions
    agent = ReinforcementLearningAgent(actions)

    # Simulated environment interaction
    for episode in range(100):
        state = 0  # Initial state
        action = agent.choose_action(state)
        reward = np.random.rand()  # Simulated reward
        next_state = state + 1 if action == 1 else state  # Example state transition
        agent.update_q_value(state, action, reward, next_state)

    print("Q-table after training:")
    print(agent.q_table)
