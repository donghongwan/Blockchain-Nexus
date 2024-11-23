import cv2
import numpy as np
import logging
import os
import json
from cryptography.fernet import Fernet

class IrisScanner:
    def __init__(self):
        self.known_irises = {}  # Dictionary to store known iris templates
        self.logger = self.setup_logger()
        self.encryption_key = self.generate_encryption_key()
        self.load_iris_data()

    def setup_logger(self):
        """Sets up a logger for the IrisScanner class."""
        logger = logging.getLogger('IrisScanner')
        logger.setLevel(logging.INFO)
        handler = logging.FileHandler('iris_scanner.log')
        handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
        logger.addHandler(handler)
        return logger

    def generate_encryption_key(self):
        """Generates a secure encryption key for storing iris data."""
        return Fernet.generate_key()

    def encrypt_data(self, data):
        """Encrypts iris data for secure storage."""
        fernet = Fernet(self.encryption_key)
        return fernet.encrypt(data.encode())

    def decrypt_data(self, encrypted_data):
        """Decrypts iris data."""
        fernet = Fernet(self.encryption_key)
        return fernet.decrypt(encrypted_data).decode()

    def load_iris_data(self):
        """Loads iris data from a secure JSON file."""
        if os.path.exists('iris_data.json'):
            with open('iris_data.json', 'r') as file:
                encrypted_data = json.load(file)
                self.known_irises = {user: self.decrypt_data(data) for user, data in encrypted_data.items()}
        else:
            self.known_irises = {}

    def save_iris_data(self):
        """Saves iris data securely to a JSON file."""
        encrypted_data = {user: self.encrypt_data(data) for user, data in self.known_irises.items()}
        with open('iris_data.json', 'w') as file:
            json.dump(encrypted_data, file)

    def add_known_iris(self, user_id, iris_data):
        """Adds a known iris template for a user."""
        try:
            self.known_irises[user_id] = iris_data
            self.save_iris_data()
            self.logger.info(f"Added known iris for user: {user_id}")
        except Exception as e:
            self.logger.error(f"Error adding known iris for user {user_id}: {e}")

    def authenticate(self, user_id, iris_data):
        """Authenticates a user based on iris scanning."""
        try:
            if user_id not in self.known_irises:
                self.logger.warning(f"User  {user_id} not found in known irises.")
                return False

            # Compare the known iris with the provided iris data
            if self.match_irises(self.known_irises[user_id], iris_data):
                self.logger.info(f"User  {user_id} authenticated successfully.")
                return True
            else:
                self.logger.warning(f"Authentication failed for user {user_id}.")
                return False
        except Exception as e:
            self.logger.error(f"Error authenticating user {user_id}: {e}")
            return False

    def match_irises(self, known_iris, provided_iris):
        """Matches the known iris with the provided iris."""
        # Placeholder for iris matching logic
        # In a real implementation, this would involve using a trained model or algorithm
        return np.random.rand() > 0.5  # Simulated matching result

    def liveness_detection(self, iris_data):
        """Implements liveness detection to prevent spoofing."""
        # Placeholder for liveness detection logic
        # In a real implementation, this could involve checking for pupil dilation, eye movement, etc.
        self.logger.info("Liveness detection passed.")
        return True

# Example usage
if __name__ == "__main__":
    iris_scanner = IrisScanner()

    # Simulated iris data (in a real scenario, this would come from an iris scanner)
    user_id = "user123"
    iris_data = "simulated_iris_data"  # Replace with actual iris data

    # Add a known iris
    iris_scanner.add_known_iris(user_id, iris_data)

    # Authenticate the user
    is_authenticated = iris_scanner.authenticate(user_id, iris_data)
    print(f"User  authenticated: {is_authenticated}")
