import hashlib
import os
import json
from typing import Dict, Any

class IdentityRecovery:
    def __init__(self, recovery_file: str):
        self.recovery_file = recovery_file
        self.recovery_data = self.load_recovery_data()

    def load_recovery_data(self) -> Dict[str, Any]:
        """
        Load recovery data from a file.
        
        :return: A dictionary containing recovery data.
        """
        if os.path.exists(self.recovery_file):
            with open(self.recovery_file, 'r') as f:
                return json.load(f)
        return {}

    def save_recovery_data(self):
        """
        Save recovery data to a file.
        """
        with open(self.recovery_file, 'w') as f:
            json.dump(self.recovery_data, f)

    def register_recovery_key(self, user_id: str, recovery_key: str):
        """
        Register a recovery key for a user.
        
        :param user_id: The user's unique identifier.
        :param recovery_key: The recovery key (e.g., a password or phrase).
        """
        hashed_key = hashlib.sha256(recovery_key.encode()).hexdigest()
        self.recovery_data[user_id] = hashed_key
        self.save_recovery_data()
        print(f"Recovery key registered for user: {user_id}")

    def recover_identity(self, user_id: str, recovery_key: str) -> bool:
 """
        Recover a user's identity using the recovery key.
        
        :param user_id: The user's unique identifier.
        :param recovery_key: The recovery key provided by the user.
        :return: True if recovery is successful, False otherwise.
        """
        hashed_key = hashlib.sha256(recovery_key.encode()).hexdigest()
        if user_id in self.recovery_data and self.recovery_data[user_id] == hashed_key:
            print(f"Identity recovery successful for user: {user_id}")
            return True
        print(f"Identity recovery failed for user: {user_id}")
        return False

if __name__ == "__main__":
    recovery_system = IdentityRecovery("recovery_data.json")

    # Register a recovery key for a user
    recovery_system.register_recovery_key(user_id="user123", recovery_key="secure_recovery_phrase")

    # Attempt to recover identity
    success = recovery_system.recover_identity(user_id="user123", recovery_key="secure_recovery_phrase")
    if success:
        print("User  identity recovered successfully.")
    else:
        print("Failed to recover user identity.")
