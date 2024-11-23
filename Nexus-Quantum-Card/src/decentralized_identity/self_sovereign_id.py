import json
from credential_management import CredentialManagement

class SelfSovereignID:
    def __init__(self):
        self.credential_manager = CredentialManagement()
        self.user_credentials = {}  # Store user credentials

    def create_identity(self, user_id, private_key):
        """Creates a new self-sovereign identity for a user."""
        self.user_credentials[user_id] = {
            "private_key": private_key,
            "credentials": []
        }

    def add_credential(self, user_id, credential_data):
        """Adds a credential to the user's identity."""
        private_key = self.user_credentials[user_id]['private_key']
        credential_id = self.credential_manager.issue_credential(user_id, credential_data, private_key)
        self.user_credentials[user_id]['credentials'].append(credential_id)
        return credential_id

    def get_credentials(self, user_id):
        """Retrieves all credentials for a user."""
        return self.user_credentials[user_id]['credentials']

# Example usage
if __name__ == "__main__":
    ssi = SelfSovereignID()
    private_key, public_key = ssi.credential_manager.verifier.generate_key_pair()
    user_id = "user456"

    ssi.create_identity(user_id, private_key)

    credential_data = {
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "date_of_birth": "1992-02-02"
    }

    credential_id = ssi.add_credential(user_id, credential_data)
    print(f"Added credential ID: {credential_id}")

    credentials = ssi.get_credentials(user_id)
    print(f"User  credentials: {credentials}")
