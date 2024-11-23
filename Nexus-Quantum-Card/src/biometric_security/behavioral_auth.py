import time
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pickle

class KeystrokeDynamics:
    def __init__(self):
        self.data = []
        self.labels = []
        self.model = None

    def record_typing(self, user_id):
        """
        Record keystroke dynamics for a user.
        
        :param user_id: Unique identifier for the user.
        """
        print(f"Recording keystrokes for user: {user_id}")
        input("Press Enter to start typing...")
        
        start_time = time.time()
        keystrokes = []
        
        while True:
            char = input("Type a character (or 'exit' to finish): ")
            if char == 'exit':
                break
            elapsed_time = time.time() - start_time
            keystrokes.append((char, elapsed_time))
            start_time = time.time()

        self.process_keystrokes(keystrokes, user_id)

    def process_keystrokes(self, keystrokes, user_id):
        """
        Process recorded keystrokes and extract features.
        
        :param keystrokes: List of keystroke tuples (character, time).
        :param user_id: Unique identifier for the user.
        """
        if len(keystrokes) < 2:
            print("Not enough keystrokes to analyze.")
            return

        # Calculate time differences between keystrokes
        time_diffs = [keystrokes[i][1] - keystrokes[i - 1][1] for i in range(1, len(keystrokes))]
        features = [np.mean(time_diffs), np.std(time_diffs), len(keystrokes)]
        
        self.data.append(features)
        self.labels.append(user_id)

    def train_model(self):
        """
        Train a machine learning model on the recorded keystroke data.
        """
        X_train, X_test, y_train, y_test = train_test_split(self.data, self.labels, test_size=0.2, random_state=42)
        self.model = RandomForestClassifier()
        self.model.fit(X_train, y_train)

        # Evaluate the model
        predictions = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, predictions)
        print(f"Model trained with accuracy: {accuracy:.2f}")

    def authenticate(self):
        """
        Authenticate a user based on their keystroke dynamics.
        """
        print("Start typing for authentication...")
        input("Press Enter to start...")
        
        start_time = time.time()
        keystrokes = []
        
        while True:
            char = input("Type a character (or 'exit' to finish): ")
            if char == 'exit':
                break
            elapsed_time = time.time() - start_time
            keystrokes.append((char, elapsed_time))
            start_time = time.time()

        if not keystrokes:
            print("No keystrokes recorded.")
            return

        # Process the keystrokes for authentication
        time_diffs = [keystrokes[i][1] - keystrokes[i - 1][1] for i in range(1, len(keystrokes))]
        features = [np.mean(time_diffs), np.std(time_diffs), len(keystrokes)]

        # Predict the user
        predicted_user = self.model.predict([features])
        print(f"Authenticated as: {predicted_user[0]}")

    def save_model(self, filename='keystroke_model.pkl'):
        """
        Save the trained model to a file.
        
        :param filename: Name of the file to save the model.
        """
        with open(filename, 'wb') as f:
            pickle.dump(self.model, f)

    def load_model(self, filename='keystroke_model.pkl'):
        """
        Load a trained model from a file.
        
        :param filename: Name of the file to load the model from.
        """
        with open(filename, 'rb') as f:
            self.model = pickle.load(f)

if __name__ == "__main__":
    kd = KeystrokeDynamics()
    kd.record_typing(user_id='user123')
    kd.train_model()
    kd.authenticate()
